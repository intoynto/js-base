!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("react"),require("intoy-modal"),require("intoy-utils"),require("intoy-xhr")):"function"==typeof define&&define.amd?define(["exports","react","intoy-modal","intoy-utils","intoy-xhr"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self)["intoy-base"]={},t.React,t["intoy-modal"],t["intoy-utils"],t["intoy-xhr"])}(this,(function(t,e,r,n,a){"use strict";function s(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var i,o=s(e);function l(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,d(t,e)}function d(t,e){return d=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},d(t,e)}function c(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}var u="qparams",h="New",p="Edit",f={records:"records",page:"page",pagecount:"pagecount",limit:"limit",rowcount:"rowcount",totalrow:"totalrow"};function g(){return f}function m(){return u}function b(){return h}function v(){return p}function y(){var t;return i&&"string"==typeof i&&(t={Authorization:"Bearer "+i}),t}function S(t,e){var n=t.code;t.xhr&&t.xhr.status!==t.code&&409!==t.code&&(n=t.xhr.status);var a=[400,409,422].indexOf(n)>=0,s=t.title,i=t.message;(a||403===n)&&(s=n+" Bad Request",409===n&&(s="Conflict"),422===n&&(s=n+" Unprocessable"),403===n&&(s="Access Denied "+n)),null!=e&&(void 0!==e.msg_before&&(e.msg_before||"").toString().trim().length>0&&(i=e.msg_before.toString().trim()+". "+i),void 0!==e.msg_after&&(e.msg_after||"").toString().trim().length>0&&(i+=". "+e.msg_after)),(a?r.AlertWarn:r.AlertError)(s,i,"OK")}var w=function(t){function e(e){var r;return(r=t.call(this,e)||this).updOnDidUpRecord=!1,r.clrDataOnFailed=!1,r._mod=!1,r.delReqTipe=m(),r.onSetLimit=function(t){null!=t&&t!==r.req.limit&&(r.req.limit=t,r.onReload())},r.lodOv=null,r.onSearch=r.onSearch.bind(c(r)),r.doReload=r.doReload.bind(c(r)),r.onReload=r.onReload.bind(c(r)),r.onInsert=r.onInsert.bind(c(r)),r.onUpdate=r.onUpdate.bind(c(r)),r.onDelete=r.onDelete.bind(c(r)),r.onAftInsert=r.onAftInsert.bind(c(r)),r.onAftUpdate=r.onAftUpdate.bind(c(r)),r.onAftDelete=r.onAftDelete.bind(c(r)),r.doSndDelete=r.doSndDelete.bind(c(r)),r.hasChangePage=r.hasChangePage.bind(c(r)),r.onSetPage=r.onSetPage.bind(c(r)),r.didUpRecord=r.didUpRecord.bind(c(r)),r.onItemBeforeUpdate=r.onItemBeforeUpdate.bind(c(r)),r.onItemUpdated=r.onItemUpdated.bind(c(r)),r.didUpList=r.didUpList.bind(c(r)),r.handResp=r.handResp.bind(c(r)),r.handSort=r.handSort.bind(c(r)),r.handRespAft=r.handRespAft.bind(c(r)),r.rdrChilds=r.rdrChilds.bind(c(r)),r.rdrFind=r.rdrFind.bind(c(r)),r.rdrTable=r.rdrTable.bind(c(r)),r.rdrPag=r.rdrPag.bind(c(r)),r.search={search:"number"==typeof e.search||"string"==typeof e.search?e.search.toString():""},r.asgFieldShow=2,r.records=[],r.req={page:1,limit:e.limit?e.limit:20,search:{}},r.res={limit:r.req.limit,page:1,pagecount:1,rowcount:0,totalrow:0,records:[]},r.state=r.gInitState(e),r}l(e,t);var s=e.prototype;return s.gInitState=function(t){return{loadedCount:0,loading:!1,error:null}},s.ovOpen=function(t){this.lodOv?t&&t.text&&this.lodOv.setText(t.text):(this.lodOv=new r.LoadingOverlay(Object.assign({clickClose:!1},t)),this.lodOv.open())},s.ovClose=function(){this.lodOv&&(this.lodOv.destroy(),this.lodOv=null)},s.getIndexArrayObj=function(t){var e=t||{},r=-1,a=n.toStr(e.field).toString().trim();if(!Array.isArray(e.arrayObj)||a.length<1)return r;var s=n.toStr(e.value).toString().trim();e.sensitive||(s=s.toUpperCase());for(var i=0;i<e.arrayObj.length;i++){var o=e.arrayObj[i];if("object"==typeof o&&!Array.isArray(o)){var l=n.toStr(o[e.field]).toString().trim();if(e.sensitive||(l=l.toUpperCase().trim()),s===l){r=i;break}}}return r},s.didUpRecord=function(t,e,r){t>=0&&r&&Array.isArray(this.records)&&this.records.length>0&&t<=this.records.length-1&&(this.records[t]=Object.assign({},r),this.onItemUpdated(),this.updOnDidUpRecord&&this.forceUpdate())},s.onItemBeforeUpdate=function(t){},s.onItemUpdated=function(){},s.didUpList=function(){},s.handResp=function(t){var e=g();t&&t[e.records]&&Array.isArray(t[e.records])?(this.res=Object.assign({},t),this.res.records=t[e.records].slice(0),this.res.page=void 0!==t[e.page]&&null!==t[e.page]?t[e.page]:1,this.res.pagecount=void 0!==t[e.pagecount]&&null!==t[e.pagecount]?t[e.pagecount]:1,this.res.totalrow=void 0!==t[e.totalrow]&&null!==t[e.totalrow]?t[e.totalrow]:this.res.records.length,this.res.rowcount=void 0!==t[e.rowcount]&&null!==t[e.rowcount]?t[e.rowcount]:this.res.records.length,this.res.limit=void 0!==t[e.limit]&&null!==t[e.limit]?t[e.limit]:this.req.limit,this.res.page=this.res.page<1?1:this.res.page,this.res.pagecount=this.res.pagecount<1?1:this.res.pagecount,this.res.totalrow=this.res.totalrow<0?0:this.res.totalrow,this.res.rowcount=this.res.rowcount<0?0:this.res.rowcount,this.res.rowcount=this.res.rowcount>this.res.totalrow?this.res.totalrow:this.res.rowcount,this.records=this.res.records.slice(0),this.res.records=[]):Array.isArray(t)?(this.records=t.slice(0),this.res.page=1,this.res.pagecount=1,this.res.rowcount=this.records.length,this.res.totalrow=n.toInt(this.res.totalrow),this.res.totalrow=this.res.totalrow<this.res.rowcount?this.res.rowcount:this.res.totalrow):(this.records=[],this.res.page=1,this.res.pagecount=1,this.res.totalrow=0,this.res.rowcount=0)},s.handSort=function(){if(Array.isArray(this.records)&&this.records.length>0&&this.props.table&&void 0!==this.props.table.sortField&&null!==this.props.table.sortField){var t=this.props.table.sortField||"index",e=this.props.table.sortFieldType||"string";this.records.sort((function(r,n){var a=r[t],s=n[t];return["integer","double"].indexOf(e)>=0&&(a=parseFloat(a),s=parseFloat(s)),a>s?1:a<s?-1:0}))}},s.handFilter=function(){},s.handRespAft=function(t){this.setState({loadedCount:this.state.loadedCount+1,loading:!1,error:null})},s.getSetup=function(t){var e={url:this.props.url_data?this.props.url_data.toString().trim():""};t&&(e.params=Object.assign({},t));var r=y();return r&&(e.headers=Object.assign({},r)),e},s.doReload=function(){var t=this,e=Object.assign({},this.req);this.res.pagecount>0&&e.page>this.res.pagecount&&(e.page=this.res.pagecount);var r=this.getSetup(Object.assign(Object.assign({},e),this.search)),n=y();n&&(r.headers=Object.assign({},n)),a.ajax(r).then((function(e){t.handResp(e),t.handSort(),t.handFilter(),t.handRespAft()})).catch((function(e){if(t.clrDataOnFailed)return t.handResp(null),void t.handRespAft(!1);t.handRespAft(!1)}))},s.onReload=function(){this.state.loading&&console.warn("Base multiple calling reload at sometime"),this.setState({loading:!0},this.doReload)},s.onSearch=function(t){n.isEqual(this.search,t)||(this.search=Object.assign({},t),this.req.page=1,this.onReload())},s.onAftInsert=function(t){this.didUpList(),this.onReload()},s.onInsert=function(){var t=this,e=this.props.compForm;e&&!this._mod&&(this._mod=!0,e({onClose:function(){return t._mod=!1}}).then((function(e){t._mod=!1,t.onAftInsert(e)})))},s.onAftUpdate=function(t){this.didUpList(),this.onReload()},s.onUpdate=function(t){var e=this,r=this.props.compForm;r&&!this._mod&&(this._mod=!0,r({data:t,onClose:function(){return e._mod=!1}}).then((function(t){e._mod=!1,e.onAftUpdate(t)})))},s.onAftDelete=function(t,e,r){var n=!0===this.props.reloadOnDeleted,a=-1;if(n||(a=this.getIndexArrayObj({arrayObj:this.records,field:e,value:r})),a>=0&&!n){if(this.records.splice(a,1),this.records.length>0)return this.didUpList(),void this.forceUpdate();n=!0}this.didUpList(),this.onReload()},s.getMsgDel=function(t){if(!t)return"";var e=this.props.table||{},r=e.fieldid,a="",s=[],i="";if(r&&t[r],n.toStr(e.dataName).toString().trim().length>0&&(i=n.toStr(e.dataName).toString().trim()),e.fields&&e.fields.length>0)for(var o=0;o<e.fields.length;o++){var l=e.fields[o],d=n.toStr(t[l.f]);if(d.length>0){d.length>50&&(d=d.substring(0,50)+"..");var c=n.toStr(e.fields[o].alias),u="<b>"+d+"</b>";c.length>0&&(u=c+" "+u),s.push(u)}if(s.length>=this.asgFieldShow)break}return i.length>0&&(a+=n.toUcWords(i)),s.length>0&&(a.length>0?a+=" item":a+="Item",a+=" data "+s.join(", ")),a+=" akan dihapus."},s.getSetupDel=function(t){var e=this,r=this.props,a={url:this.props.url_delete?this.props.url_delete.toString().trim():"",params:t,method:"POST"};return"qparams"===this.delReqTipe?function(){var e=r.table&&r.table.fieldid?r.table.fieldid:null;e="string"==typeof e?(e=n.toStr(e)).length>0?[e]:[]:Array.isArray(e)?e:[];var s=n.rTrim(n.toStr(r.url_delete),"/");s+="?"!==s[s.length-1]?"?":"",a.method="delete",a.params={},t=t||{};for(var i=0;i<e.length;i++){var o=e[i],l=n.toStr(t[o]).toString().trim();l.length>0&&(a.params[o]=l)}var d=new URLSearchParams(a.params);delete a.params,a.url=s+d.toString()}():function(){var r=e.props.table||{},s=r.fieldid?r.fieldid:"";s=Array.isArray(s)?s:[s];for(var i=[],o=0;o<s.length;o++){var l=n.toStr(s[o]),d=l.length>0?n.toStr(t[l]).toString().trim():"";d.length>0&&i.push(d)}i.length>0&&(a.method="DELETE",a.url+="/"+i.join("/"),delete a.params);var c=y();c&&(a.headers=c)}(),a},s.doSndDelete=function(t){var e=this;this.setState({loading:!0},(function(){var r=e.props.table||{},n=r.fieldid?r.fieldid:"";e.ovOpen({text:"Menghapus,.."}),a.ajax(t).then((function(r){e.ovClose(),e.setState({loading:!1},(function(){e.onAftDelete(t.params,n,r)}))})).catch((function(t){e.ovClose(),S(t),e.setState({loading:!1})}))}))},s.onDelete=function(t){var e=this,n=this.getMsgDel(t),a="Terkait data dimaksud ada kemungkinan akan ikut terhapus. <br/>&nbsp;<br/>Apakah Anda setuju?";n+=(n+" "+a).length>100?"<br/>":" ",n+=a;r.AlertExclam("Konfirmasi Hapus",n,'<i class="fa fa-hand-stop-o"> </i> Tidak',(function(){}),'<i class="fa fa-thumbs-o-up"> </i> Iya setuju hapus',(function(){var r=e.getSetupDel(t);e.doSndDelete(r)}))},s.hasChangePage=function(t){return(t=(t=(t=n.toInt(t))<1?1:t)>this.res.pagecount?this.res.pagecount:t)!==this.res.page},s.onSetPage=function(t){this.state.loading||this.hasChangePage(t)&&(this.req.page=t,this.onReload())},s.getFndProps=function(){return{useInsert:this.props.useInsert,search:Object.assign({},this.search),onSearch:this.onSearch,onReload:this.onReload,onInsert:this.onInsert,onSetLimit:this.onSetLimit,limit:this.req.limit,loading:this.state.loading}},s.getTblProps=function(){return{useUpdate:this.props.useUpdate,useDelete:this.props.useDelete,onUpdate:this.onUpdate,onDelete:this.onDelete,onReload:this.onReload,table:this.props.table,records:this.records,page:this.res.page,limit:this.req.limit,loading:this.state.loading}},s.getPagProps=function(){return{page:this.res.page,pagecount:this.res.pagecount,rowcount:this.res.rowcount,limit:this.res.limit,totalrow:this.res.totalrow,onSetPage:this.onSetPage,dsLeft:!0,dsRight:!0}},s.rdrFind=function(){var t=this.props.compFind;if(t){var e=this.getFndProps();return o.default.createElement(t,Object.assign({},e))}},s.rdrTable=function(){var t=this.props.compTbl;if(t){var e=this.getTblProps();return o.default.createElement(t,Object.assign({},e))}},s.rdrPag=function(){if(this.res.pagecount<=1)return null;var t=this.props.compPag;if(t){var e=this.getPagProps();return o.default.createElement(t,Object.assign({},e))}},s.rdrChilds=function(){return[this.rdrFind(),this.rdrTable(),this.rdrPag()]},s.render=function(){var t=this.state.loading;return o.default.createElement("div",{className:"base"+(this.props.className?" "+this.props.className:"")+(t?" loading":"")},this.rdrChilds())},s.componentDidMount=function(){this.onReload()},e}(o.default.Component),C=function(t){function e(e){var r;return(r=t.call(this,e)||this).textInsert="",r.textReload="",r.textReloadIcon="fa-search",r.state=r.gInitState(e),r.onCh=r.onCh.bind(c(r)),r.onChUpdate=r.onChUpdate.bind(c(r)),r.onChLimit=r.onChLimit.bind(c(r)),r.callPropsSearch=r.callPropsSearch.bind(c(r)),r.hKeyPress=r.hKeyPress.bind(c(r)),r.rdrApFind=r.rdrApFind.bind(c(r)),r.onClickIns=r.onClickIns.bind(c(r)),r.onClickLoad=r.onClickLoad.bind(c(r)),r.onClickSearch=r.onClickSearch.bind(c(r)),r.btnInsertIcon=function(){return o.default.createElement("i",{className:"fa fa-plus-circle"})},r.btnInsertClass="btn btn-outline-primary",r}l(e,t);var r=e.prototype;return r.gInitState=function(t){var e={search:{search:""}};return null!=t&&t.search&&(e.search=Object.assign({},t.search)),e},r.callPropsSearch=function(){"function"==typeof this.props.onSearch&&this.props.onSearch(this.state.search)},r.onCh=function(t){if(t&&t.target&&t.target.name){var e=this.state.search||{},r=t.currentTarget.value;e[t.currentTarget.name]=Array.isArray(r)?r.slice(0):r,this.setState({search:Object.assign({},e)})}},r.onChUpdate=function(t){if(t&&t.target&&t.currentTarget.name){var e=this.state.search||{},r=t.currentTarget.value;e[t.currentTarget.name]=Array.isArray(r)?r.slice(0):r,this.setState({search:Object.assign({},e)},this.callPropsSearch)}},r.onChLimit=function(t){var e=""===t.target.value?20:parseInt(t.target.value);isNaN(e)&&(e=0);var r=this.props||{},n=void 0!==r.limit&&null!==r.limit?parseInt(r.limit):0;isNaN(n)&&(n=0),e!==n&&"function"==typeof this.props.onSetLimit&&this.props.onSetLimit(e)},r.hKeyPress=function(t){t&&"Enter"===t.key&&this.callPropsSearch()},r.onClickIns=function(t){if(t&&t.preventDefault(),!this.props.loading&&this.props.useInsert&&"function"==typeof this.props.onInsert){var e=t?t.target:void 0;void 0!==e&&"function"==typeof e.blur&&e.blur(),this.props.onInsert()}},r.onClickLoad=function(t){t&&t.preventDefault(),this.props.loading||(n.isEqual(this.state.search,this.props.search)?"function"==typeof this.props.onReload&&this.props.onReload():this.callPropsSearch())},r.onClickSearch=function(t){t&&t.preventDefault(),this.props.loading||this.callPropsSearch()},r.rdrApFind=function(){var t=this.props,e=t.loading,r=[o.default.createElement("button",{type:"button",className:"btn",onClick:this.onClickLoad},o.default.createElement("i",{className:"fa "+(this.props.loading?"fa-spin fa-spinner":this.textReloadIcon)}),this.textReload?" "+this.textReload:"")];return t.useInsert&&r.push(o.default.createElement("button",{type:"button",className:e?"btn-outline-secondary":this.btnInsertClass,onClick:this.onClickIns},!e&&o.default.createElement("span",null,this.btnInsertIcon?"function"==typeof this.btnInsertIcon?this.btnInsertIcon():this.btnInsertIcon:null,this.textInsert?" "+this.textInsert:""),e&&o.default.createElement("i",{className:"fa fa-spin fa-spinner"}))),r},r.render=function(){var t=this.state.search||{};return o.default.createElement("div",{className:"base-find noprint"},o.default.createElement("div",{className:"input-group"},o.default.createElement("div",{className:"input-group-element"},o.default.createElement("input",{type:"text",name:"search",id:"search",autoComplete:"off",placeholder:"Keyword",value:t.search,onChange:this.onCh,onKeyPress:this.hKeyPress,spellCheck:"false"})),o.default.createElement("div",{className:"input-group-append"},this.rdrApFind())))},e}(o.default.Component),E=function(t,e,r){return o.default.createElement("a",{title:"kehalaman "+t,onClick:function(e){e.preventDefault(),r&&r(t)}},o.default.createElement("span",{className:e}))},I=function(t,e,r){var n=e!==t?r:null,a=e===t?"active aktif":"";return o.default.createElement("a",{className:"step "+a,onClick:function(e){e.preventDefault(),n&&n(t)}},o.default.createElement("span",null,t))};function O(t){var e=t.page,r=t.pagecount,a=t.range;e=n.toInt(e),r=n.toInt(r);var s=(a=n.toInt(a))%2==0?a/2-1:(a-1)/2,i=e-s,o=e+(a%2==0?s+1:s);return(o=o<(i=i<1?1:i)+a-1?i+a-1:o)>r&&(i=i>1?r-a+1:1,o=r),{page:e,pagecount:r,range:a,pagemin:i=i<1?1:i,pagemax:o}}function A(t){var e=Object.assign({},t);if(e.table_head=[],e.table_row=[],e.fields&&Array.isArray(e.fields)&&e.fields.length>0)for(var r=0;r<e.fields.length;r++){var a=e.fields[r]||{},s="";s=a.alias?a.alias:n.toUcWords(a.f),(s=n.toStr(s)).length>0&&(e.table_head.push(s),e.table_row.push(Object.assign(Object.assign({},a),{f:a.f,cb:a.cb})))}return e}var R=function(t){function e(e){var r;return(r=t.call(this,e)||this).table=A(e.table||{}),r}return l(e,t),e.prototype.render=function(){var t=this,e=this.table.table_head||[],r=this.table.table_row||[],n=this.props.records||[],a=0,s=this.props.useUpdate||this.props.useDelete;return o.default.createElement("div",{className:"base-data-table"},o.default.createElement("table",{className:"table"},o.default.createElement("thead",null,o.default.createElement("tr",null,o.default.createElement("th",{className:"deep"},"No"),e.map((function(t,e){return o.default.createElement("th",{key:e},t)})),s&&o.default.createElement("th",{className:"deep noprint"},o.default.createElement("i",{className:"fa fa-gear"})))),o.default.createElement("tbody",null,n.map((function(e,n){return a++,o.default.createElement("tr",{key:n},o.default.createElement("td",{className:"deep",align:"center"},a),r.map((function(t,r){var n=e[t.f];if("function"==typeof t.cb)try{n=t.cb(e[t.f],e)}catch(t){}var a={};return t.align&&(a.align=t.align),t.style&&(a.style=t.style),t.className&&(a.className=t.className),o.default.createElement("td",Object.assign({key:r},a),n)})),s&&o.default.createElement("td",{className:"deep noprint"},o.default.createElement("div",{className:"base-actions"},o.default.createElement("a",{onClick:function(r){r.preventDefault(),t.props.onUpdate&&t.props.onUpdate(e)},className:"btn btn-outline-secondary btn-sm"},o.default.createElement("i",{className:"fa fa-pencil"})),o.default.createElement("a",{onClick:function(r){r.preventDefault(),t.props.onDelete&&t.props.onDelete(e)},className:"btn btn-outline-danger btn-sm"},o.default.createElement("i",{className:"fa fa-trash-o"})))))})))))},e}(o.default.Component);var j=function(t){function e(e){var r;return(r=t.call(this,e)||this).classForm="modalForm",r.btnSaveText="Simpan",r.btnCancelText="Batal",r.useEfieldId=!0,r.titleIns=b(),r.titleUpd=v(),r.styleForm={},r.hUploadProgress=r.hUploadProgress.bind(c(r)),r.onSubmit=r.onSubmit.bind(c(r)),r.onCh=r.onCh.bind(c(r)),r.onClSubmit=r.onClSubmit.bind(c(r)),r.onSuccess=r.onSuccess.bind(c(r)),r.getCkBoxVal=r.getCkBoxVal.bind(c(r)),r.prevData=Object.assign({},e.data),r.data=Object.assign({},e.data),r.nodeForm=null,r.state=r.gInitState(),r}l(e,t);var r=e.prototype;return r.gInitState=function(){return{loading:!1,progress:null}},r.getIncludeFields=function(){return[]},r.getCkBoxVal=function(t,e){return e&&(Array.isArray(t)&&t.length>0||n.toStr(t).toString().trim().length>0)?t:null},r.getEditing=function(){return!n.isObjectEmpty(this.prevData)},r.getSetup=function(){var t=this,e=this.getEditing(),r={url:e?this.props.url_update||"":this.props.url_insert||"",method:"post",formElement:this.nodeForm,uploadProgress:this.hUploadProgress};e&&(r.params={},this.useEfieldId&&(r.params[this.props.fieldid]=this.prevData[this.props.fieldid]),r.params[this.props.fieldid+"_lama"]=this.prevData[this.props.fieldid]);var n=this.getIncludeFields()||[];if(n.length>0){r.params||(r.params={});for(var a=0;a<n.length;a++){var s=this.data[n[a]];null==s&&(s=this.prevData[n[a]]),null!=s&&(r.params[n[a]]=s)}}if(this.nodeForm){var i=this.nodeForm;["input[type=checkbox]"].forEach((function(e){var n=i.querySelectorAll(e),a=function(e,n,a){var s=function(t){return r.params?r.params[t]:null}(e);s=null==s?function(e){return t.data[e]}(e):s,null!=s&&(r.params||(r.params={}),r.params[e]=s)};n.forEach((function(t){var e=t;e.name&&"checkbox"===e.type&&a(e.name,e.value)}))}))}var o=y();return o&&(r.headers=Object.assign({},o)),r},r.hUploadProgress=function(t){this.setState({progress:t?Object.assign({},t):null})},r.onSuccess=function(t){"function"==typeof this.props.onUpdate&&this.props.onUpdate(t),"function"==typeof this.props.onClose&&this.props.onClose()},r.onSubmit=function(t){var e=this;t&&t.preventDefault(),this.setState({loading:!0},(function(){var t=e.getSetup();a.ajax(t).then((function(t){e.onSuccess(t)})).catch((function(t){e.setState({loading:!1,progress:null}),S(t)}))}))},r.onCh=function(t){var e=t.target.type;if(this.data[t.target.name]=t.target.value,"checkbox"===e){var r=t.target.checked,n=t.target.value;n=this.getCkBoxVal(n,r),this.data[t.target.name]=n,null==n&&delete this.data[t.target.name]}this.forceUpdate()},r.onClSubmit=function(t){t&&t.preventDefault(),this.onSubmit()},r.rdrTitle=function(){var t=this.state.loading;return o.default.createElement("div",{className:"windowTitle"},o.default.createElement("div",{className:"auto"},this.getEditing()?this.titleUpd+" ":this.titleIns+" ",this.props.formTitle?this.props.formTitle:"Data"),o.default.createElement("div",null,!t&&o.default.createElement("a",{className:"close",onClick:this.props.onClose},"✖")))},r.rdrActions=function(){var t=this.state.loading;return o.default.createElement("div",{className:"windowAction"},t&&o.default.createElement("button",{type:"button",className:"btn"},"Mengirim... ",o.default.createElement("i",{className:"fa fa-spin fa-spinner"})),!t&&o.default.createElement("button",{type:"submit",className:"btn btn-outline-primary",onClick:this.onClSubmit},o.default.createElement("i",{className:"fa fa-save"})," ",this.btnSaveText," "),!t&&o.default.createElement("button",{type:"button",className:"btn btn-outline-danger",onClick:this.props.onClose},o.default.createElement("i",{className:"fa fa-remove"})," ",this.btnCancelText))},r.rdrContent=function(){return this.data,o.default.createElement("div",{className:"windowContent"},"Use content this,....")},r.render=function(){var t=this,e=this.state,r=e.loading,n=e.progress;return o.default.createElement("form",{ref:function(e){return t.nodeForm=e},className:""+(this.classForm?this.classForm:""),onSubmit:this.onSubmit,style:this.styleForm},o.default.createElement("div",{className:"wrap",style:{position:"relative"}},this.rdrTitle(),this.rdrContent(),this.rdrActions(),r&&o.default.createElement("div",{style:{position:"absolute",width:"100%",height:"100%",overflow:"hidden",display:"flex",alignItems:"flex-end",justifyContent:"center",left:"0",top:"0",zIndex:2}},n&&o.default.createElement("div",{className:"relative w-2/3 gap-1",style:{position:"relative",marginBottom:"12.5%",width:"75%",display:"grid",gap:"0.5rem"}},o.default.createElement("div",{className:"flex justify-between text-xs",style:{display:"flex",justifyContent:"space-between",fontSize:"0.75rem"}},o.default.createElement("div",null,n.percentage.toFixed(2),"%"),o.default.createElement("div",null,"100%")),o.default.createElement("div",{className:"relative h-2 border rounded overflow-hidden bg-white border-blue-500",style:{position:"relative",border:"solid 1px #3B82F6",backgroundColor:"white",overflow:"hidden",borderRadius:"0.25rem"}},o.default.createElement("div",{className:"bg-blue-500",style:{position:"absolute",left:0,top:0,height:"100%",transition:"all 274ms ease-in-out",backgroundColor:"#3B82F6",width:n.percentage+"%"}}))))))},e}(o.default.Component);var x=function(t){function e(e){var r;return(r=t.call(this,e)||this).gInitState=r.gInitState.bind(c(r)),r.state=r.gInitState(e),r.onTgOpen=r.onTgOpen.bind(c(r)),r.onReloadSelf=r.onReloadSelf.bind(c(r)),r.rdrChild=r.rdrChild.bind(c(r)),r}l(e,t);var r=e.prototype;return r.gInitState=function(t){return t=t||this.props,{open:!1}},r.onTgOpen=function(t){t&&t.preventDefault(),this.setState({open:!this.state.open})},r.onReloadSelf=function(){},r.rdrChild=function(){},e}(o.default.Component),D=function(t){function e(e){var r;return(r=t.call(this,e)||this).res=null,r.doLoad=r.doLoad.bind(c(r)),r.onReload=r.onReload.bind(c(r)),r}l(e,t);var r=e.prototype;return r.getStp=function(){var t,e;return{url:null!==(t=this.props.url)&&void 0!==t?t:"",params:this.props.params,method:null!==(e=this.props.method)&&void 0!==e?e:"GET",headers:y()}},r.doLoad=function(){var t=this,e=this.getStp();a.ajax(e).then((function(e){t.res=Object.assign({},e),t.setState({loading:!1,error:null})})).catch((function(e){t.res=null,t.setState({loading:!1,error:e})}))},r.onReload=function(t){t&&t.preventDefault(),this.setState({loading:!1,error:null},this.doLoad)},r.componentDidMount=function(){this.props.url&&this.props.url.length>0&&this.onReload()},e}(o.default.Component);t.Base=w,t.BaseFind=C,t.BaseLoader=D,t.BaseModal=j,t.BasePag=function(t){var e=O({page:n.toInt(t.page),pagecount:n.toInt(t.pagecount),range:5}),r=[];e.pagecount>1&&e.page>1&&r.push(E(1,"first",t.onSetPage)),e.page>1&&1!==e.page&&r.push(E(e.page-1,"prev",t.onSetPage));for(var a=e.pagemin;a<e.pagemax;a++)r.push(I(a,e.page,t.onSetPage));e.page<e.pagecount&&r.push(E(e.page+1,"next",t.onSetPage)),e.pagecount>1&&e.page<e.pagecount&&r.push(E(e.pagecount,"last",t.onSetPage));var s=void 0===t.dsLeft||!0!==t.dsLeft&&!1!==t.dsLeft||t.dsLeft,i=void 0===t.dsRight||!0!==t.dsRight&&!1!==t.dsRight||t.dsRight,l=s||i?function(t){var e=t.page,r=t.limit,a=t.rowcount,s=t.totalrow;e=n.toInt(e),a=n.toInt(a),s=n.toInt(s);var i=((e=e<1?1:e)-1)*(r=n.toInt(r))+1,l=i+r-1;return l=l>s?s:l,o.default.createElement("div",{className:"info"},o.default.createElement("b",null,i),"-",o.default.createElement("b",null,l),s>0&&o.default.createElement("span",null," / ",o.default.createElement("b",null,n.toDashVal(s))))}({page:e.page,limit:n.toInt(t.limit),rowcount:n.toInt(t.rowcount),totalrow:n.toInt(t.totalrow)}):null,d={justifyContent:"center"};return(i&&!i||!s&&i)&&(d.justifyContent=i?"flex-start;":"flex-end"),o.default.createElement("div",{className:"pagination"},t.dsLeft&&l,o.default.createElement("div",{className:"paging",style:d},r),t.dsRight&&l)},t.BaseTable=R,t.Item=x,t.baseResAttrGet=g,t.baseResAttrSet=function(t){for(var e=["records","page","pagecount","limit","rowcount","totalrow"],r=0;r<e.length;r++)e[r]in t&&(f[e[r]]=t[e[r]])},t.createModalPromise=function(t){var e=t.component,n=t.url_insert,a=t.url_update,s=t.formTitle,i=t.data,o=t.fieldid,l=void 0===o?"id":o,d=function(t,e){var r={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.indexOf(n)<0&&(r[n]=t[n]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(n=Object.getOwnPropertySymbols(t);a<n.length;a++)e.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(t,n[a])&&(r[n[a]]=t[n[a]])}return r}(t,["component","url_insert","url_update","formTitle","data","fieldid"]);return new Promise((function(t){r.modal({component:e||j,props:Object.assign(Object.assign({data:i,formTitle:s,url_insert:n,url_update:a,fieldid:l},d),{onUpdate:function(e){t(e)}})})}))},t.generateFromSetupTable=A,t.generatePageInfo=O,t.getConfigHeader=y,t.getDefaultBaseModalTitleInsert=b,t.getDefaultBaseModalTitleUpdate=v,t.getDefaultDeleteRequestType=m,t.handleAlertErrorBase=S,t.handleResponseSelf=function(t){if(void 0!==this.res&&null!==this.res&&"object"==typeof this.res){var e=t;e&&e.records&&Array.isArray(e.records)?(this.res=Object.assign({},e),this.res.records=e.records.slice(0),this.res.page=void 0!==this.res.page&&null!==this.res.page?this.res.page:1,this.res.pagecount=void 0!==this.res.pagecount&&null!==this.res.pagecount?this.res.pagecount:1,this.res.totalrow=void 0===this.res.totalrow||null===this.res.totalrow?this.res.records.length:this.res.totalrow,this.res.rowcount=void 0===this.res.rowcount||null===this.res.rowcount?this.res.records.length:this.res.rowcount,this.res.limit=void 0!==e.limit&&null!==e.limit?e.limit:this.req.limit,this.res.page=this.res.page<1?1:this.res.page,this.res.pagecount=this.res.pagecount<1?1:this.res.pagecount,this.res.totalrow=this.res.totalrow<0?0:this.res.totalrow,this.res.rowcount=this.res.rowcount<0?0:this.res.rowcount,this.res.rowcount=this.res.rowcount>this.res.totalrow?this.res.totalrow:this.res.rowcount,this.records=this.res.records.slice(0),this.res.records=[]):Array.isArray(e)?(this.records=e.slice(0),this.res.page=1,this.res.pagecount=1,this.res.totalrow=this.records.length,this.res.rowcount=this.res.totalrow):(this.records=[],this.res.page=1,this.res.pagecount=1,this.res.totalrow=0,this.res.rowcount=0)}},t.setConfigHeader=function(t){i=t||null},t.setDefaultBaseModalTitleInsert=function(t){h=t},t.setDefaultBaseModalTitleUpdate=function(t){p=t},t.setDefaultDeleteRequestType=function(t){u=t},Object.defineProperty(t,"__esModule",{value:!0})}));
//# sourceMappingURL=index.js.map
