var Lang = A.Lang,
	isFunction = Lang.isFunction,

	getClassName = A.getClassName,

	NAME = 'uploaderdd',

	INPUT_FILE = 'input[type=file]',

	CSS_HELPER_HIDDEN = getClassName('helper', 'hidden'),
	CSS_UPLOADER_HTML = getClassName(NAME, 'html'),
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
						'Content-Type: application/octet-stream\r\n';

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
			},
			fileSizeLimit: {
				value: null
			},
			generateNewId: {
				value: false
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

				var uploaderswf = instance.uploaderswf;
				var swfId = uploaderswf._swfId || uploaderswf._id;

				instance._swf = A.one('#' + swfId);

				if (instance.canSupportXHR() && !instance.get('disableXHR')) {
					instance._renderFileSelect();

					instance._initializeUploader();
				}
				else {
					if (!instance.get('buttonSkin')) {
						var container = instance.get('container');

						container.append(instance._content.html());

						container.addClass(CSS_UPLOADER_HTML);

						var swf = instance._swf;

						swf.setStyle('width', container.get('offsetWidth'));
						swf.setStyle('height', container.get('offsetHeight'));

						instance._bindMouseEvents(container);
					}

					instance.on(
						'fileselect',
						instance._onFileSelect,
						instance
					);

					instance.on(
						[ 'uploadcomplete', 'uploaderror', 'uploadcancel' ],
						instance._onUploadComplete,
						instance
					);
				}

				instance._xhr = {};
				instance._queueList = [];
				instance._totalFileCount = 0;
			},

			cancel: function(fileId) {
				var instance = this;

				if (instance._isSwfVisible()) {
					return UploaderDD.superclass.cancel.apply(instance, arguments);
				}
				else {
					if (instance._xhr[fileId]) {
						instance._xhr[fileId].abort();

						return true;
					}

					return false;
				}
			},

			cancelAll: function() {
				var instance = this;

				var count = 0;

				if (instance._isSwfVisible()) {
					var fileList = instance.get('fileList');

					for (var i in fileList) {
						instance.cancel(i);

						count++;
					}
				}
				else {
					instance._queueList = [];

					for (var i in instance._xhr) {
						instance._xhr[i].abort();

						count++;
					}
				}

				return count;
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

				instance.set('fileList', {});

				return UploaderDD.superclass.clearFileList.apply(instance, arguments);
			},

			disable: function() {
				var instance = this;

				var fileSelect = instance._fileSelect;

				if (fileSelect) {
					fileSelect.all(INPUT_FILE).attr('disabled', true);
				}

				return UploaderDD.superclass.disable.apply(instance, arguments);
			},

			enable: function() {
				var instance = this;

				var fileSelect = instance._fileSelect;

				if (fileSelect) {
					fileSelect.all(INPUT_FILE).attr('disabled', false);
				}

				return UploaderDD.superclass.enable.apply(instance, arguments);
			},

			removeFile: function(fileId) {
				var instance = this;

				var fileList = instance.get('fileList');

				delete fileList[fileId];

				if (instance._isSwfVisible()) {
					return UploaderDD.superclass.removeFile.apply(instance, arguments);
				}
			},

			upload: function(fileId, url, method, postVars, postFileVarName) {
				var instance = this;

				if (instance._isSwfVisible()) {
					UploaderDD.superclass.upload.apply(instance, arguments);
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

							instance._removeFile(file);

							instance.fire(
								'uploadstart',
								{
									id: fileId,
									type: 'uploadstart'
								}
							);
						}
						else {
							if (instance._getQueueIndex(fileId) == -1) {
								instance._queueList.push(
									{
										arguments: arguments,
										file: file,
										id: fileId
									}
								);
							}
						}

						delete fileList[fileId];

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
						var id = 'file' + (instance.get('generateNewId') ? instance._getNewId() : fileCount);
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
							var fileSizeLimit = instance.get('fileSizeLimit');

							if (!fileSizeLimit || item.size <= fileSizeLimit) {
								while (fileList[id] || instance._getQueueIndex(id) != -1) {
									fileCount++;

									id = 'file' + fileCount;
								}

								item.id = id;

								fileList[id] = item;

								instance._totalFileCount++;

								return true;
							}
							else {
								instance.fire(
									'filesizeerror',
									{
										file: item,
										type: 'filesizeerror'
									}
								);

								return null;
							}
						}
					}
				}

				return false;
			},

			_appendInputFile: function(width) {
				var instance = this;

				var fileSelect = instance._fileSelect;
				var formSelect = fileSelect.one('form');

				var input = A.Node.create(Lang.sub(TPL_SELECT_INPUT, [(instance.get('multiFiles') ? 'true' : 'false')]));

				if (width) {
					input.setStyle('width', width);
				}

				formSelect.append(input);
			},

			_bindMouseEvents: function(container) {
				var instance = this;

				var fireEvent = A.bind(instance._fireEvent, instance);

				container.on('click', fireEvent);
				container.on('mousedown', fireEvent);
				container.on('mouseup', fireEvent);
				container.on('mouseleave', fireEvent);
				container.on('mouseenter', fireEvent);
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
				var file = uploaderDD.file;

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

				buffer.push(Lang.sub(TPL_XHR_FORM_UPLOAD, [boundary, filePostName, (fileName != null ? fileName : uploaderDD.file.name)]));
				buffer.push('\r\n');
				buffer.push(result);
				buffer.push('\r\n');
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
				var file = uploaderDD.file;

				instance = uploaderDD.instance;

				if (target.readyState == 4) {
					var status = target.status;
					var responseData = (target.responseXML != null ? target.responseXML : target.responseText);

					if ((status >= 200 && status < 300) || status === 1223) {
						if (responseData != null) {
							instance.fire(
								'uploadcompletedata',
								{
									data: responseData,
									id: fileId,
									status: status,
									type: 'uploadcompletedata'
								}
							);
						}
					}
					else {
						instance.fire(
							'uploaderror',
							{
								data: responseData,
								id: fileId,
								status: status,
								type: 'uploaderror'
							}
						);
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

			_getQueueLength: function() {
				var instance = this;

				var queueList = instance._queueList;
				var count = 0;

				if (queueList) {
					for (var i = 0; i < queueList.length; i++) {
						if (!queueList[i].sent) {
							count++;
						}
					}
				}

				return count;
			},

			_getNewId: function() {
				var instance = this;

				return instance._totalFileCount;
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

					if (files) {
						for (var i = 0; i < files.length; i++) {
							instance._addFile(files[i]);
						}
					}

					instance.fire(
						'fileselect',
						{
							fileList: instance.get('fileList')
						}
					);
				}

				instance.fire('drop', event);
			},

			_onFileSelect: function(event) {
				var instance = this;

				var fileList = instance.get('fileList');
				var eventFileList = event.fileList;

				for (var i in eventFileList) {
					fileList[i] = eventFileList[i];
				}
			},

			_onUploadComplete: function(event) {
				var instance = this;

				var fileId = event.id;
				var fileList = instance.get('fileList');

				delete fileList[fileId];

				instance.removeFile(fileId);
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
					var index = instance._getQueueIndex(file.id);
					var sent = true;

					instance._queueList[index].sent = true;

					for (var i = 0; i < instance._queueList.length; i++) {
						if (!instance._queueList[i].sent) {
							sent = false;

							break;
						}
					}

					if (sent) {
						instance._queueList = [];
					}
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

					instance._toggleSwf(false);

					var multiFiles = instance.get('multiFiles');
					var formSelect = fileSelect.one('form');
					var offsetHeight = wrapper.get('offsetHeight');

					do {

						instance._appendInputFile(offsetWidth);

					} while (formSelect.get('offsetHeight') < offsetHeight);

					formSelect.delegate(
						'change',
						function(event) {
							var instance = this;

							var files = event.currentTarget.get('files');

							A.some(
								files._nodes,
								function(item, index, collection) {
									var result = instance._addFile(item);

									if (result == false) {
										return true;
									}
								}
							);

							instance.fire(
								'fileselect',
								{ 
									fileList: instance.get('fileList')
								}
							);

							var target = event.target;

							if (target) {
								target.remove(true);

								instance._appendInputFile(offsetWidth);
							}
						},
						INPUT_FILE,
						instance
					);

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
					instance.publish('filesizeerror');

					instance.publish('click');
					instance.publish('mousedown');
					instance.publish('mouseup');
					instance.publish('mouseleave');
					instance.publish('mouseenter');

					instance._bindMouseEvents(wrapper);

					if (instance.canSupportDD()) {
						wrapper.on('dragenter', instance._onDragEnter, instance);
						wrapper.on('dragover', instance._onDragOver, instance);
						wrapper.on('dragleave', instance._fireEvent, instance);
						wrapper.on('drop', instance._onDrop, instance);
					}
				}
			},

			_sendQueued: function() {
				var instance = this;

				var queueList = instance._queueList;

				for (var i = 0; i < queueList.length; i++) {
					if (!queueList[i].sent) {
						instance.upload.apply(instance, queueList[i].arguments);
					}
				}
			},

			_toggleSwf: function(open) {
				var instance = this;

				var swf = instance._swf;

				if (swf) {
					var fileSelect = instance._fileSelect;

					if (open == null) {
						open = !instance._isSwfVisible();
					}

					instance.clearFileList();

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
				}
			},
		}
	}
);

A.UploaderDD = UploaderDD;