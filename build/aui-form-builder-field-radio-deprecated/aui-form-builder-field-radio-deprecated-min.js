YUI.add("aui-form-builder-field-radio-deprecated",function(e,t){var n=e.Lang,r=e.Escape,i=e.getClassName,s=i("radio"),o=i("field"),u=i("field","choice"),a=i("field","radio"),f=i("form-builder-field"),l=i("form-builder-field","node"),c=i("form-builder-field","options","container"),h='<div class="'+c+'"></div>',p='<div class="'+s+'"><label class="field-label" for="{id}"><input id="{id}" class="'+[o,u,a,l].join(" ")+'" name="{name}" type="radio" value="{value}" {checked} {disabled} />{label}</label></div>',d=e.Component.create({ATTRS:{template:{valueFn:function(){return p}}},CSS_PREFIX:f,EXTENDS:e.FormBuilderMultipleChoiceField,NAME:"form-builder-radio-field",prototype:{getHTML:function(){return h},_uiSetDisabled:function(e){var t=this,n=t.get("templateNode");n.all("input").each(function(t){e?t.setAttribute("disabled",e):t.removeAttribute("disabled")})},_uiSetOptions:function(t){var i=this,s=[],o=0,u=i.get("predefinedValue"),a=i.get("templateNode");e.each(t,function(t){var a=e.Array.indexOf(u,t.value)>-1;s.push(n.sub(p,{checked:a?'checked="checked"':"",disabled:i.get("disabled")?'disabled="disabled"':"",id:r.html(i.get("id")+o++),label:r.html(t.label),name:r.html(i.get("name")),value:r.html(t.value)}))}),i.optionNodes=e.NodeList.create(s.join("")),a.setContent(i.optionNodes)},_uiSetPredefinedValue:function(e){var t=this,n=t.optionNodes;if(!n)return;n.set("checked",!1),n.all('input[value="'+r.html(e)+'"]').set("checked",!0)}}});e.FormBuilderRadioField=d,e.FormBuilderField.types.radio=e.FormBuilderRadioField},"3.1.0-deprecated.23",{requires:["aui-form-builder-field-deprecated"]});
