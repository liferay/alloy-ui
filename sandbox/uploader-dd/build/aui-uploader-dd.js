AUI.add('aui-uploader-dd', function(A) {
var Lang = A.Lang,
	isFunction = Lang.isFunction,

	getClassName = A.ClassNameManager.getClassName,

	NAME = 'uploaderdd',

	INPUT_FILE = 'input[type=file]',

	CSS_HELPER_HIDDEN = getClassName('helper', 'hidden'),
	CSS_UPLOADER_HTML = getClassName(NAME, 'html')
	CSS_UPLOADER_IMAGE = getClassName(NAME, 'image'),

	TPL_UPLOADER_HTML = '<{0} id="{1}" class="' + CSS_UPLOADER_HTML + '"><form></form></{0}>',
	TPL_UPLOADER_IMAGE = '<div id="{0}" class="' + CSS_UPLOADER_IMAGE + '"><a href="javascript://"><form></form></a></div>',
	TPL_SELECT_INPUT = '<input type="file" />',
	TPL_SELECT_STYLESHEET = '#{0} a [ width: {2}px; height: {3}px; background: url({1}) 0 0 no-repeat; ]' +
							'#{0} a:hover [ background-position: 0 -{3}px; ]' +
							'#{0} a:active [ background-position: 0 -{4}px; ]',

	TPL_XHR_FOOTER = '--{0}--',
	TPL_XHR_FORM_DATA = '--{0}\r\n' +
						'Content-Disposition: form-data; name="{1}"\r\n' +
						'\r\n{2}\r\n',
	TPL_XHR_FORM_UPLOAD = '--{0}\r\n' +
						'Content-Disposition: form-data; name="{1}"; filename="{2}"\r\n' +
						'Content-Type: application/octet-stream\r\n' +
						'\r\n{3}\r\n';

var UploaderDD = A.Component.create(
	{
		NAME: NAME,

		EXTENDS: A.Uploader,

		ATTRS: {
			container: {
				value: null
			},
			disableXHR: {
				value: false,
				writeOnce: 'initOnly'
			},
			fileFilters: {
				value: [],
				setter: function(val) {
					var instance = this;

					var fileFilters = val;
					var fileFiltersRegExp = [];

					if (fileFilters) {
						for (var i = 0; i < fileFilters.length; i++) {
							var extensions = fileFilters[i].extensions;

							if (extensions) {
								extensions = extensions.split(';');

								for (var j = 0; j < extensions.length; j++) {
									var fileExt = Lang.trim(extensions[j]);

									if (fileExt.length) {
										fileExt = fileExt.replace(/\./g, '\\.');
										fileExt = fileExt.replace(/\*/g, '(.*?)');
										fileExt = '^' + fileExt + '$';

										fileFiltersRegExp.push(fileExt);
									}
								}
							}
						}
					}

					instance._fileFiltersRegExp = (fileFiltersRegExp.length ? fileFiltersRegExp : null);

					UploaderDD.superclass.setFileFilters.apply(instance, arguments);

					return val;
				}
			},
			fileList: {
				value: {}
			},
			filePostName: {
				value: null
			}
		},

		constructor: function(config) {
			var instance = this;

			if (config.boundingBox) {
				instance._content = A.one(config.boundingBox).cloneNode(true);
			}

			UploaderDD.superclass.constructor.apply(instance, arguments);
		},

		prototype: {
			initializer: function() {
				var instance = this;

				instance.set('container', A.one(instance.get('boundingBox')));

				if (instance.canSupportXHR() && !instance.get('disableXHR')) {
					instance._renderFileSelect();

					instance._initializeUploader();
				}
			},

			cancel: function(fileId) {
				var instance = this;

				if (instance._isSwfVisible()) {
					UploaderDD.superclass.cancel.apply(instance, arguments);
				}
				else {
					if (instance._xhr[fileId]) {
						instance._xhr[fileId].abort();

						instance._removeXHR(fileId);
					}
				}
			},

			canSupportDD: function() {
				var instance = this;

				return ('draggable' in document.createElement(instance.get('container').get('tagName')));
			},

			canSupportXHR: function() {
				var instance = this;

				return (window.XMLHttpRequest && window.FileReader);
			},

			clearFileList: function() {
				var instance = this;

				if (instance._isSwfVisible()) {
					UploaderDD.superclass.clearFileList.apply(instance, arguments);
				}
				else {
					instance.set('fileList', {});
				}
			},

			disable: function() {
				var instance = this;

				var fileSelect = instance._fileSelect;

				if (fileSelect) {
					fileSelect.all(INPUT_FILE).attr('disabled', true);
				}

				UploaderDD.superclass.disable.apply(instance, arguments);
			},

			enable: function() {
				var instance = this;

				var fileSelect = instance._fileSelect;

				if (fileSelect) {
					fileSelect.all(INPUT_FILE).attr('disabled', false);
				}

				UploaderDD.superclass.enable.apply(instance, arguments);
			},

			removeFile: function(fileId) {
				var instance = this;

				if (instance._isSwfVisible()) {
					UploaderDD.superclass.removeFile.apply(instance, arguments);
				}
				else {
					var fileList = instance.get('fileList');

					delete fileList[fileId];
				}
			},

			toggleSwf: function(open) {
				var instance = this;

				var swf = instance._swf;
				var fileSelect = instance._fileSelect;

				if (swf) {
					if (open == null) {
						open = !instance._isSwfVisible();
					}

					if (open) {
						swf.show();

						if (fileSelect) {
							fileSelect.hide();
						}
					}
					else if (fileSelect) {
						swf.hide();

						fileSelect.show();
					}

					instance.clearFileList();
				}
			},

			upload: function(fileId, url, method, postVars, postFileVarName) {
				var instance = this;

				if (instance._isSwfVisible()) {
					return UploaderDD.superclass.upload.apply(instance, arguments);
				}
				else {
					var fileList = instance.get('fileList');
					var file = fileList[fileId] || instance._getQueuedById(fileId);

					if (instance._xhr[fileId]) {
						instance._removeFile(file);

						return true;
					}

					if (file) {
						var simLimit = instance.get('simLimit');
						var xhrCount = instance._getXHRCount();

						delete fileList[fileId];

						if (xhrCount < simLimit) {
							var xhr = new XMLHttpRequest();

							xhr._uploaderDD = {
								file: file,
								fileId: fileId,
								fileName: postFileVarName,
								instance: instance,
								postVars: postVars
							};

							instance._xhr[fileId] = xhr;

							xhr.addEventListener('readystatechange', A.bind(instance._doReadyStateChangeXHR, xhr), false);

							xhr.upload.addEventListener('progress', A.bind(instance._doProgressXHR, xhr), false);
							xhr.upload.addEventListener('error', A.bind(instance._doErrorXHR, xhr), false);
							xhr.upload.addEventListener('abort', A.bind(instance._doAbortXHR, xhr), false);
							xhr.upload.addEventListener('load', A.bind(instance._doLoadXHR, xhr), false);

							xhr.open((method ? method : 'POST'), url, true);

							var fileReader = new FileReader();

							if (isFunction(fileReader.addEventListener)) {
								fileReader.addEventListener('loadend', A.bind(instance._doLoadEndXHR, xhr), false);
							}
							else {
								fileReader.onloadend = A.bind(instance._doLoadEndXHR, xhr);
							}

							fileReader.readAsBinaryString(file);

							instance.fire(
								'uploadstart',
								{
									id: fileId,
									type: 'uploadstart'
								}
							);

							instance._removeFile(file);
						}
						else {
							if (instance._getQueueIndex(fileId) == -1) {
								var queueList = instance._queueList;

								queueList.push(
									{
										arguments: arguments,
										file: file,
										id: fileId
									}
								);
							}
						}

						return true;
					}
				}

				return false;
			},

			uploadAll: function (url, method, postVars, postFileVarName) {
				var instance = this;

				if (instance._isSwfVisible()) {
					return UploaderDD.superclass.uploadAll.apply(instance, arguments);
				}
				else {
					var fileList = instance.get('fileList');

					for (var fileId in fileList) {
						instance.upload(fileId, url, method, postVars, postFileVarName);
					}

					return true;
				}
			},

			uploadThese: function (fileIds, url, method, postVars, postFileVarName) {
				var instance = this;

				if (instance._isSwfVisible()) {
					return UploaderDD.superclass.uploadThese.apply(instance, arguments);
				}
				else {
					if (fileIds) {
						for (var i = 0; i < fileIds.length; i++) {
							instance.upload(fileIds[i], url, method, postVars, postFileVarName);
						}
					}

					return true;
				}

				return false;
			},

			_addFile: function(item) {
				var instance = this;

				if (item instanceof File) {
					var fileList = instance.get('fileList');
					var fileCount = instance._getFileCount();

					if (instance.get('multiFiles') || fileCount == 0) {
						var id = 'file' + fileCount;
						var found = false;
						var fileFiltersRegExp = instance._fileFiltersRegExp;

						if (fileFiltersRegExp) {
							var fileName = item.name;

							for (var i = 0; i < fileFiltersRegExp.length; i++) {
								var regExp = new RegExp(fileFiltersRegExp[i], 'gi');

								if (regExp.test(fileName)) {
									found = true;

									break;
								}
							}
						}
						else {
							found = true;
						}

						if (found) {
							while (fileList[id] || instance._getQueueIndex(id) != -1) {
								fileCount++;

								id = 'file' + fileCount;
							}

							item.id = id;

							fileList[id] = item;

							return true;
						}
					}
				}

				return false;
			},

			_doAbortXHR: function(event) {
				var instance = this;

				var xhr = instance;
				var uploaderDD = xhr._uploaderDD;
				var fileId = uploaderDD.fileId;
				var file = uploaderDD.file;

				instance = uploaderDD.instance;

				instance._removeXHR(fileId);

				instance.fire(
					'uploadcancel',
					{
						id: fileId,
						file: file,
						type: 'uploadcancel'
					}
				);

				instance._sendQueued();
			},

			_doErrorXHR: function(event) {
				var instance = this;

				var xhr = instance;
				var uploaderDD = xhr._uploaderDD;
				var fileId = uploaderDD.fileId;

				instance = uploaderDD.instance;

				instance._removeXHR(fileId);

				instance.fire(
					'uploaderror',
					{
						id: fileId,
						type: 'uploaderror'
					}
				);

				instance._sendQueued();
			},

			_doLoadEndXHR: function(event) {
				var instance = this;

				var xhr = instance;
				var uploaderDD = xhr._uploaderDD;
				var fileName = uploaderDD.fileName;
				var postVars = uploaderDD.postVars;
				var result = event.currentTarget.result;
				var sendAsBinary = isFunction(xhr.sendAsBinary);
				var buffer = [];

				instance = uploaderDD.instance;

				var boundary = '__' + new Date().getTime() + '__';

				if (postVars) {
					for (var i in postVars) {
						buffer.push(Lang.sub(TPL_XHR_FORM_DATA, [boundary, i, postVars[i]]));
					}
				}

				if (!sendAsBinary) {
					result = btoa(result);
				}

				var filePostName = instance.get('filePostName');

				if (filePostName == null || filePostName == '') {
					filePostName = uploaderDD.fileId;
				}

				buffer.push(Lang.sub(TPL_XHR_FORM_UPLOAD, [boundary, filePostName, (fileName != null ? fileName : uploaderDD.file.name), result]));
				buffer.push(Lang.sub(TPL_XHR_FOOTER, [boundary]));

				xhr.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);

				var body = buffer.join('');

				if (sendAsBinary) {
					xhr.sendAsBinary(body);
				}
				else {
					xhr.send(body);
				}
			},

			_doLoadXHR: function(event) {
				var instance = this;

				var xhr = instance;
				var uploaderDD = xhr._uploaderDD;
				var fileId = uploaderDD.fileId;

				instance = uploaderDD.instance;

				instance._removeXHR(fileId);

				instance.fire(
					'uploadcomplete',
					{
						id: fileId,
						type: 'uploadcomplete'
					}
				);

				instance._sendQueued();
			},

			_doProgressXHR: function(event) {
				var instance = this;

				if (event.lengthComputable) {
					var xhr = instance;
					var uploaderDD = xhr._uploaderDD;
					var fileId = uploaderDD.fileId;

					instance = uploaderDD.instance;

					instance.fire(
						'uploadprogress',
						{
							bytesLoaded: event.loaded,
							bytesTotal: event.total,
							id: fileId,
							type: 'uploadprogress'
						}
					);
				}
			},

			_doReadyStateChangeXHR: function(event) {
				var instance = this;

				var xhr = instance;
				var uploaderDD = xhr._uploaderDD;
				var fileId = uploaderDD.fileId;
				var target = event.currentTarget;

				instance = uploaderDD.instance;

				if (target.readyState == 4) {
					var status = target.status;

					if (status >= 200 && status < 300 || status === 1223) {
						var responseData = (target.responseXML != null ? target.responseXML : target.responseText);

						if (responseData != null) {
							instance.fire(
								'uploadcompletedata',
								{
									data: responseData,
									id: fileId,
									type: 'uploadcompletedata'
								}
							);
						}
					}
				}
			},

			_fireEvent: function(event) {
				var instance = this;

				instance.fire(event.type, event);
			},

			_getFileCount: function() {
				var instance = this;

				return instance._getItemCount(instance.get('fileList'));
			},

			_getItemCount: function(items) {
				var instance = this;

				var count = 0;

				if (items) {
					for (var i in items) {
						count++;
					}
				}

				return count;
			},

			_getQueuedById: function(fileId) {
				var instance = this;

				var queueList = instance._queueList;

				var index = instance._getQueueIndex(fileId);

				return (index != -1 ? queueList[index].file : null);
			},

			_getQueueIndex: function(fileId) {
				var instance = this;

				var queueList = instance._queueList;

				for (var i = 0; i < queueList.length; i++) {
					if (queueList[i].id == fileId) {
						return i;
					}
				}

				return -1;
			},

			_getXHRCount: function() {
				var instance = this;

				return instance._getItemCount(instance._xhr);
			},

			_isSwfVisible: function() {
				var instance = this;

				var swf = instance._swf;

				return (swf ? !swf.hasClass(CSS_HELPER_HIDDEN) : false);
			},

			_onDragEnter: function(event) {
				var instance = this;

				event.stopPropagation();
				event.preventDefault();

				instance.fire('dragenter', event);
			},

			_onDragOver: function(event) {
				var instance = this;

				event.stopPropagation();
				event.preventDefault();

				instance.fire('dragover', event);
			},

			_onDrop: function(event) {
				var instance = this;

				event.stopPropagation();
				event.preventDefault();

				var originalEvent = event._event;

				if (originalEvent.dataTransfer) {
					var files = originalEvent.dataTransfer.files;
					var fileList = {};

					if (files) {
						for (var i = 0; i < files.length; i++) {
							var item = files[i];

							if (instance._addFile(item)) {
								fileList[item.id] = item;
							}
						}
					}

					instance.fire(
						'fileselect',
						{ 
							fileList: fileList
						}
					);
				}

				instance.fire('drop', event);
			},

			_removeFile: function(file) {
				var instance = this;

				var fileList = instance.get('fileList');

				for (var i in fileList) {
					if (fileList[i] == file) {
						delete fileList[i];

						break;
					}
				}

				if (instance._queueList.length) {
					A.Array.removeItem(instance._queueList, file);
				}
			},

			_removeXHR: function(fileId) {
				var instance = this;

				delete instance._xhr[fileId];
			},

			_renderFileSelect: function() {
				var instance = this;

				if (!instance._fileSelect) {
					var container = instance.get('container');

					var swfId = instance.uploaderswf._swfId || instance.uploaderswf._id;

					instance._swf = A.one('#' + swfId);

					var buttonSkin = instance.get('buttonSkin');

					var contentId = A.guid();
					var wrapper;
					var fileSelect;
					var offsetWidth;

					if (buttonSkin) {
						fileSelect = A.Node.create(Lang.sub(TPL_UPLOADER_IMAGE, [contentId]));

						container.append(fileSelect);

						var offsetHeight = container.get('offsetHeight');

						var tpl = Lang.sub(TPL_SELECT_STYLESHEET, [contentId, buttonSkin, container.get('offsetWidth'), offsetHeight, (offsetHeight * 2)]);
	
						tpl = tpl.replace(/\[/g, '{');
						tpl = tpl.replace(/\]/g, '}');
	
						var stylesheet = new A.StyleSheet(tpl);

						wrapper = container;

						offsetWidth = wrapper.get('offsetWidth');
					}
					else {
						var tag = (container.getComputedStyle('display') == 'block' ? 'div' : 'span');

						fileSelect = A.Node.create(Lang.sub(TPL_UPLOADER_HTML, [tag, contentId]));

						var parent = container.ancestor();

						parent.insert(fileSelect, container);

						container.append(instance._content.html());

						fileSelect.append(container);

						wrapper = fileSelect;

						offsetWidth = container.get('offsetWidth');
					}

					instance._fileSelect = fileSelect;

					instance.toggleSwf(false);

					var multiFiles = instance.get('multiFiles');
					var formSelect = fileSelect.one('form');
					var offsetHeight = wrapper.get('offsetHeight');

					do {
						var input = A.Node.create(Lang.sub(TPL_SELECT_INPUT, [(multiFiles ? 'true' : 'false')]));

						input.setStyle('width', offsetWidth);

						formSelect.append(input);

					} while (formSelect.get('offsetHeight') < offsetHeight);

					formSelect.delegate(
						'change',
						function(event) {
							var instance = this;

							var files = event.currentTarget.get('files');
							var fileList = {};

							A.some(
								files._nodes,
								function(item, index, collection) {
									if (instance._addFile(item)) {
										fileList[item.id] = item;
									}
									else {
										return true;
									}
								}
							);

							instance.fire(
								'fileselect',
								{ 
									fileList: fileList
								}
							);
						},
						INPUT_FILE,
						instance
					);

					instance._xhr = {};
					instance._queueList = [];

					instance.publish('click');
					instance.publish('mousedown');
					instance.publish('mouseup');
					instance.publish('mouseleave');
					instance.publish('mouseenter');
					instance.publish('dragenter');
					instance.publish('dragover');
					instance.publish('dragleave');
					instance.publish('drop');
					instance.publish('fileselect');
					instance.publish('uploadprogress');
					instance.publish('uploadcomplete');
					instance.publish('uploadcompletedata');
					instance.publish('uploaderror');
					instance.publish('uploadcancel');
					instance.publish('uploadstart');

					var fireEvent = A.bind(instance._fireEvent, instance);

					wrapper.on('click', fireEvent);
					wrapper.on('mousedown', fireEvent);
					wrapper.on('mouseup', fireEvent);
					wrapper.on('mouseleave', fireEvent);
					wrapper.on('mouseenter', fireEvent);

					if (instance.canSupportDD()) {
						wrapper.on('dragenter', instance._onDragEnter, instance);
						wrapper.on('dragover', instance._onDragOver, instance);
						wrapper.on('dragleave', fireEvent);
						wrapper.on('drop', instance._onDrop, instance);
					}
				}
			},

			_sendQueued: function() {
				var instance = this;

				var queueList = instance._queueList;

				for (var i in queueList) {
					instance.upload.apply(instance, queueList[i].arguments);
				}
			}
		}
	}
);

A.UploaderDD = UploaderDD;

}, '@VERSION@' ,{requires:['aui-base','stylesheet','uploader'], skinnable:true});
