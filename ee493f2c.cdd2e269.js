(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{106:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return s})),n.d(t,"metadata",(function(){return u})),n.d(t,"rightToc",(function(){return p})),n.d(t,"default",(function(){return b}));var i=n(3),o=n(7),r=(n(0),n(126)),l=n(219),a=(n(107),n(53),n(135)),c=n(133),s={id:"LinkPlugin",title:"Link Plugin",sidebar_label:"Link Plugin"},u={unversionedId:"plugins_api/LinkPlugin",id:"plugins_api/LinkPlugin",isDocsHomePage:!1,title:"Link Plugin",description:"import 'wix-rich-content-plugin-link/dist/styles.min.css';",source:"@site/docs/plugins_api/LinkPlugin.mdx",slug:"/plugins_api/LinkPlugin",permalink:"/rich-content/docs/plugins_api/LinkPlugin",version:"current",sidebar_label:"Link Plugin",sidebar:"api",previous:{title:"Hashtag Plugin",permalink:"/rich-content/docs/plugins_api/HashtagPlugin"},next:{title:"Video Plugin",permalink:"/rich-content/docs/plugins_api/VideoPlugin"}},p=[{value:"Usage",id:"usage",children:[]},{value:"Link Config API",id:"link-config-api",children:[{value:"<code>onClick</code>",id:"onclick",children:[]},{value:"<code>Link Preview</code>",id:"link-preview",children:[]},{value:"Anchor (Link To Section)",id:"anchor-link-to-section",children:[]},{value:"<code>linkTypes</code>",id:"linktypes",children:[]},{value:"<code>Site URL (Anchor SEO)</code>",id:"site-url-anchor-seo",children:[]}]}],d={rightToc:p};function b(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(r.b)("wrapper",Object(i.a)({},d,n,{components:t,mdxType:"MDXLayout"}),Object(r.b)("p",null,"Link plugin allow the user to add links"),Object(r.b)("div",{id:"top-section",className:"card"},Object(r.b)(c.a,{content:Object(a.v)("Add Link to your favorite website"),placeholder:"Type here!",plugins:[Object(l.a)({linkTypes:{anchor:!1}})],mdxType:"RicosEditorWithMobile"})),Object(r.b)("h2",{id:"usage"},"Usage"),Object(r.b)("pre",null,Object(r.b)("code",Object(i.a)({parentName:"pre"},{className:"language-jsx"}),"/* Editor */\nimport { RicosEditor } from 'ricos-editor';\nimport { pluginLink } from 'wix-rich-content-plugin-link';\nimport 'ricos-editor/dist/styles.min.css';\nimport 'wix-rich-content-plugin-link/dist/styles.min.css';\n<RicosEditor plugins={[pluginLink(LinkConfig)]} />;\n\n/* Viewer */\nimport { RicosViewer } from 'ricos-viewer';\nimport { pluginLink } from 'wix-rich-content-plugin-link/dist/module.viewer';\nimport 'wix-rich-content-plugin-link/dist/styles.min.css';\n<RicosViewer plugins={[pluginLink(LinkConfig)]} />;\n")),Object(r.b)("h2",{id:"link-config-api"},"Link Config API"),Object(r.b)("h3",{id:"onclick"},Object(r.b)("inlineCode",{parentName:"h3"},"onClick")),Object(r.b)("pre",null,Object(r.b)("code",Object(i.a)({parentName:"pre"},{className:"language-jsx"}),"onClick?: (event: React.MouseEvent<HTMLElement>, text: string) => void;\n")),Object(r.b)("p",null,"Default value:"),Object(r.b)("pre",null,Object(r.b)("code",Object(i.a)({parentName:"pre"},{className:"language-jsx"}),"none;\n")),Object(r.b)("h3",{id:"link-preview"},Object(r.b)("inlineCode",{parentName:"h3"},"Link Preview")),Object(r.b)("p",null,"The Link Preview Plugin is implemented within the Link Plugin,\nand is activated once the Link Plugin Settings object contains preview field.\nFor further information check the PreviewPlugin page."),Object(r.b)("p",null,"Default value:"),Object(r.b)("pre",null,Object(r.b)("code",Object(i.a)({parentName:"pre"},{className:"language-jsx"}),"none;\n")),Object(r.b)("h3",{id:"anchor-link-to-section"},"Anchor (Link To Section)"),Object(r.b)("p",null,"Anchor option allows users to navigate to a certain section of the website"),Object(r.b)("div",{className:"card"},Object(r.b)(c.a,{content:Object(a.v)("Try it yourself, add new lines and use the link to section option. \nMake sure you link only to the lines you created"),placeholder:"Type here!",plugins:[Object(l.a)()],mdxType:"RicosEditorWithMobile"})),Object(r.b)("h3",{id:"linktypes"},Object(r.b)("inlineCode",{parentName:"h3"},"linkTypes")),Object(r.b)("p",null,"Supported Links types"),Object(r.b)("p",null,"Default value:"),Object(r.b)("pre",null,Object(r.b)("code",Object(i.a)({parentName:"pre"},{className:"language-jsx"}),"{ anchor: true }\n")),Object(r.b)("h3",{id:"site-url-anchor-seo"},Object(r.b)("inlineCode",{parentName:"h3"},"Site URL (Anchor SEO)")),Object(r.b)("pre",null,Object(r.b)("code",Object(i.a)({parentName:"pre"},{className:"language-jsx"}),"siteUrl?: string\n")),Object(r.b)("p",null,"Is used in ssr for seo. So anchors will be defined with the site url.\nOn client adds that correct url in the addressbar."),Object(r.b)("p",null,"Copy the link below to your addressbar to go the top section."),Object(r.b)("pre",null,Object(r.b)("code",Object(i.a)({parentName:"pre"},{className:"language-jsx"}),"https://wix-incubator.github.io/rich-content/docs/plugins_api/LinkPlugin#top-section\n")))}b.isMDXComponent=!0},128:function(e,t,n){"use strict";var i=!1,o="userAgent";try{o=navigator.userAgent}catch(r){}(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(o)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(o.substr(0,4)))&&(i=!0),t.a=i},133:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var i,o=n(139),r=n(3),l=n(0),a=n.n(l),c=n(128),s=(i=o.a,function(e){return a.a.createElement(i,Object(r.a)({},e,{isMobile:c.a}))})},219:function(e,t,n){"use strict";n.d(t,"a",(function(){return N}));var i=n(138),o=n(129),r=n(123),l=n(0),a=n.n(l),c=n(131),s=n.n(c),u=n(220),p=n(124),d=function(){return(d=Object.assign||function(e){for(var t,n=1,i=arguments.length;n<i;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},b=function(){return(b=Object.assign||function(e){for(var t,n=1,i=arguments.length;n<i;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},g={config:{alignment:"center",size:"content",link:{target:"_blank",rel:"noopener"}}},f=function(e,t,n){return!!(n&&e&&t)&&(i=t,new Promise((function(e){var t=document.createElement("img");t.src=i,t.onload=function(){e(!0)},t.onerror=function(){e(!1)}})));var i},h=function(e,t,n){return Array.isArray(t)?t.filter((function(e){return n.toLowerCase().includes(e.toLowerCase())})).length>0:e&&t},m=function(e,t){return function(e){function t(){return e.exports=t=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},t.apply(this,arguments)}e.exports=t}(t={exports:{}}),t.exports}(),v=function(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.__proto__=t},k={fontElementMap:"X2v_J",link:"_2qJYG",linkToAnchorInViewer:"_1A33_",toolbarUrlContainer:"_2X50f",toolbarUrl:"_12uJp",toolbarUrlAnchor:"_3cwQn"},y=function(e){function t(t){var n;(n=e.call(this,t)||this).handleClick=function(e){var t,i,o,l=n.props,a=l.componentData,c=l.isInEditor,s=a.anchor;if(null===(t=n.props)||void 0===t||null===(i=t.settings)||void 0===i||null===(o=i.onClick)||void 0===o||o.call(i,e,s||n.getHref()),s&&!c){e.preventDefault();var u="viewer-"+s;history.pushState({},null,"#"+u);var p=document.getElementById(u);Object(r.B)(p)}},Object(r.V)(t.componentData,u);var i=n.props.theme;return n.styles=Object(r.O)({styles:k,theme:i}),n}v(t,e);var n=t.prototype;return n.componentWillReceiveProps=function(e){Object(p.isEqual)(e.componentData,this.props.componentData)||Object(r.V)(e.componentData,u)},n.getHref=function(e,t){var n,i,o=null===(n=this.props.config)||void 0===n||null===(i=n.LINK)||void 0===i?void 0:i.siteUrl;return e?Object(r.Q)(e):o?o+"#viewer-"+t:void 0},n.getTarget=function(e,t,n){return e?"_self":t||n||"_self"},n.render=function(){var e,t=this.props,n=t.componentData,i=t.anchorTarget,o=t.relValue,r=t.children,l=t.isInEditor,c=n.url,u=n.anchor,p=n.target,d=n.rel,b={href:this.getHref(c,u),target:this.getTarget(u,p,i),rel:d||o||"noopener",className:s()(this.styles.link,(e={},e[this.styles.linkToAnchorInViewer]=u&&!l,e)),onClick:this.handleClick};return a.a.createElement("a",b,r)},t}(l.Component),w=function(e){var t=e.entityKey,n=e.contentState,i=e.children,o=e.anchorTarget,r=e.relValue,l=e.settings,c=e.href,s=e.rel,u=e.target,p=function(e,t){if(null==e)return{};var n,i,o={},r=Object.keys(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,["entityKey","contentState","children","anchorTarget","relValue","settings","href","rel","target"]),d=c?{url:c,rel:s,target:u}:n.getEntity(t).getData();return a.a.createElement(y,m({componentData:d,anchorTarget:o,relValue:r,settings:l,isInEditor:!0},p),i)},O=function(e,t,n){e.findEntityRanges((function(e){var t=e.getEntity();return null!==t&&"LINK"===n.getEntity(t).getType()}),t)};function j(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var x=function(e){function t(){for(var t,n=arguments.length,i=new Array(n),r=0;r<n;r++)i[r]=arguments[r];return(t=e.call.apply(e,[this].concat(i))||this).showLinkPanel=function(){var e,n,i=t.props,r=i.getEditorState,l=i.setEditorState,a=i.theme,c=i.isMobile,s=i.linkModal,u=i.helpers,d=i.keyName,b=i.anchorTarget,g=i.relValue,f=i.t,h=i.uiSettings,v=i.insertLinkFn,k=i.closeInlinePluginToolbar,y=i.config,w=i.innerModal,O=i.toolbarOffsetTop,j=i.toolbarOffsetLeft,x=null===(e=y.LINK)||void 0===e?void 0:e.linkTypes,T=!x||Object(p.isEmpty)(x)||!Object.values(x).find((function(e){return!!e})),L=Object(o.ib)({fullScreen:!T,isMobile:c,customStyles:{content:{position:"fixed"}}}),E={helpers:u,modalName:o.o.TEXT_LINK_MODAL,anchorTarget:b,relValue:g,theme:a,t:f,uiSettings:h,getEditorState:r,setEditorState:l,insertLinkFn:v,closeInlinePluginToolbar:k,linkTypes:null===(n=y.LINK)||void 0===n?void 0:n.linkTypes};if(c||s)if(u&&u.openModal){var P=m({modalStyles:L,hidePopup:u.closeModal,isMobile:c},E);u.openModal(P)}else console.error("Open external helper function is not defined for toolbar button with keyName "+d);else{var S=m({hidePopup:w.closeInnerModal,top:O,left:j,modalStyles:T?null:{maxWidth:"none",padding:"0 19px"}},E);w.openInnerModal(S)}},t}return v(t,e),t.prototype.render=function(){var e,t,n,i=this.props,r=i.theme,l=i.isMobile,c=i.tabIndex,s=i.config,u=i.isActive,p=i.icon,d=i.tooltipText,b={button:r.inlineToolbarButton,buttonWrapper:r.inlineToolbarButton_wrapper,icon:r.inlineToolbarButton_icon,active:r.inlineToolbarButton_active},g=(null==s||null===(e=s.LINK)||void 0===e||null===(t=e.toolbar)||void 0===t||null===(n=t.icons)||void 0===n?void 0:n.InsertPluginButtonIcon)||p;return a.a.createElement(o.y,{onClick:this.showLinkPanel,isActive:u,theme:m({},r,b),isMobile:l,tooltipText:d,tabIndex:c,icon:g})},n=t,(i=[{key:"isActive",get:function(){return Object(o.pb)(this.props.getEditorState())}}])&&j(n.prototype,i),r&&j(n,r),t;var n,i,r}(l.Component),T=function(e){return a.a.createElement("svg",d({xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",width:"19",height:"19",viewBox:"0 0 19 19"},e),a.a.createElement("defs",null,a.a.createElement("path",{id:"remove-link",d:"M7.8 6c.11 0 .2.09.2.2v.807H4.5c-1.38 0-2.5 1.12-2.5 2.5 0 1.326 1.032 2.41 2.336 2.495l.164.005H8v.793c0 .11-.09.2-.2.2H4.5C2.567 13 1 11.433 1 9.5S2.567 6 4.5 6h3.3zm5.7 0C15.433 6 17 7.567 17 9.5S15.433 13 13.5 13h-3.3c-.11 0-.2-.09-.2-.2v-.807h3.5c1.38 0 2.5-1.12 2.5-2.5 0-1.381-1.12-2.5-2.5-2.5H10V6.2c0-.11.09-.2.2-.2h3.3zm-1.7 3c.11 0 .2.09.2.2v.6c0 .11-.09.2-.2.2H6.2c-.11 0-.2-.09-.2-.2v-.6c0-.11.09-.2.2-.2h5.6z"})),a.a.createElement("g",{fill:"none",fillRule:"evenodd"},a.a.createElement("use",{fill:"currentColor",transform:"rotate(-45 9 9.5)",xlinkHref:"#remove-link"}),a.a.createElement("path",{stroke:"currentColor",strokeLinecap:"square",d:"M3.5 3.5l11 12"})))},L=function(e){function t(){for(var t,n=arguments.length,i=new Array(n),r=0;r<n;r++)i[r]=arguments[r];return(t=e.call.apply(e,[this].concat(i))||this).deleteLink=function(){var e=t.props,n=e.getEditorState,i=e.setEditorState,r=e.closeInlinePluginToolbar;i(Object(o.Ab)(n(),i)),r()},t}return v(t,e),t.prototype.render=function(){var e=this.props,t=e.theme,n=e.isMobile,i=e.t,r=e.tabIndex,l=i("LinkPanelContainer_RemoveButton"),c={button:t.inlineToolbarButton,buttonWrapper:t.inlineToolbarButton_wrapper,icon:t.inlineToolbarButton_icon,active:t.inlineToolbarButton_active};return a.a.createElement(o.v,{onClick:this.deleteLink,theme:m({},t,c),isMobile:n,tooltipText:l,tabIndex:r,icon:T,dataHook:"RemoveLinkButton"})},t}(l.Component),E=function(e){function t(t){var n;(n=e.call(this,t)||this).handleClick=function(){var e=n.props.getEditorState,t=(Object(o.gb)(e())||{}).anchor,i=void 0===t?"":t,l=document.querySelectorAll("[data-editor]"),a=Array.apply(null,l).find((function(e){return e.dataset.offsetKey===i+"-0-0"}));Object(r.B)(a)},n.preventDefault=function(e){return e.preventDefault()};var i=n.props.theme;return n.styles=Object(r.O)({styles:k,theme:i}),n}return v(t,e),t.prototype.render=function(){var e,t=this.styles,n=this.props,i=n.getEditorState,l=n.t,c=Object(o.gb)(i())||{},u=c.url,p=void 0===u?"":u,d=c.anchor,b=c.target,g=c.rel,f=p?Object(r.Q)(p):void 0,h={href:f,target:b||"_self",rel:g||"noopener",className:s()(t.toolbarUrl,(e={},e[t.toolbarUrlAnchor]=d,e)),onMouseDown:this.preventDefault,onClick:d&&this.handleClick};return a.a.createElement("div",{className:t.toolbarUrlContainer},a.a.createElement("a",h,f||l("LinkTo_Toolbar_GoTo")))},t}(l.Component),P=function(e){return[{keyName:"url",component:function(t){return a.a.createElement(E,d({},e,t))},mobile:!0,type:i.b.CUSTOM},{keyName:"separator1",type:i.b.SEPARATOR,mobile:!0},{keyName:"edit",component:function(t){return a.a.createElement("div",{"data-hook":"EditLinkButton",style:{margin:"0 2px 0 -7px"}},a.a.createElement(x,d({insertLinkFn:o.Fb,icon:i.f,tooltipText:e.t("LinkTo_Edit_Tooltip")},e,t)))},mobile:!0,type:i.b.CUSTOM},{keyName:"separator2",type:i.b.SEPARATOR,mobile:!0},{keyName:"remove",component:function(t){return a.a.createElement("div",{style:{margin:"0 -6px 0 -6px"}},a.a.createElement(L,d({},e,t)))},mobile:!0,type:i.b.CUSTOM}]},S=function(e){var t=e.helpers,n=e.isMobile,i=e.anchorTarget,r=e.relValue,l=e.t,a=e.theme,c=e.getEditorState,s=e.setEditorState,u=e.uiSettings,p=e.closeInlinePluginToolbar,d=e.settings,b=Object(o.ib)({fullScreen:!1,isMobile:n,customStyles:{content:{maxWidth:"max-content",padding:"1px 20px"}}});if(t&&t.openModal){var g={helpers:t,modalStyles:b,isMobile:n,getEditorState:c,setEditorState:s,t:l,theme:a,anchorTarget:i,relValue:r,modalName:o.o.TEXT_LINK_MODAL,hidePopup:t.closeModal,uiSettings:u,insertLinkFn:o.rb,closeInlinePluginToolbar:p,linkTypes:null==d?void 0:d.linkTypes};t.openModal(g)}else console.error("Link plugin: failed to display Link modal dialog since helpers.openModal is not defined")},I={config:{linkTypes:{anchor:!0}}},_=function(e){var t=e,n=t.theme,l=t.anchorTarget,c=t.relValue,s=t.LINK,u=void 0===s?{}:s,p=t.commonPubsub,m=function(e,t){var n={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.indexOf(i)<0&&(n[i]=e[i]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(i=Object.getOwnPropertySymbols(e);o<i.length;o++)t.indexOf(i[o])<0&&Object.prototype.propertyIsEnumerable.call(e,i[o])&&(n[i[o]]=e[i[o]])}return n}(t,["theme","anchorTarget","relValue","LINK","commonPubsub"]),v="_blank"===l,k="nofollow"===c;u.minLinkifyLength=u.minLinkifyLength||6;var y,j,T=function(e){return{TextButtonMapper:function(){var t;return(t={})[o.r.LINK]={component:function(t){return a.a.createElement(x,d({insertLinkFn:o.rb,isActive:Object(o.pb)(e.getEditorState()),closeInlinePluginToolbar:e.closeInlinePluginToolbar,tooltipText:e.t("TextLinkButton_Tooltip"),innerModal:e.innerModal},t))},keyBindings:[{keyCommand:{command:"link",modifiers:[o.C.COMMAND],key:"k"},commandHandler:function(t){if(Object(o.pb)(t))return e.closeInlinePluginToolbar(),Object(o.Ab)(t);S(e)}}],externalizedButtonProps:{onClick:function(t){t.preventDefault(),S(e)},isActive:function(){return Object(o.pb)(e.getEditorState())},isDisabled:function(){return Object(o.ub)(e.getEditorState())},getIcon:function(){var t,n,i;return(null===(i=null===(n=null===(t=e.LINK)||void 0===t?void 0:t.toolbar)||void 0===n?void 0:n.icons)||void 0===i?void 0:i.InsertPluginButtonIcon)||o.z},tooltip:e.t("TextLinkButton_Tooltip"),getLabel:function(){return""},type:o.e.BUTTON}},t},InlinePluginToolbarButtons:P(e),name:"link"}}(d(d({},e),{closeInlinePluginToolbar:E})),L=[{strategy:O,component:function(e){return a.a.createElement(w,d({},e,{theme:n}))}}];function E(){p.set("cursorOnInlinePlugin",null)}var _=function(e){var t=C(e);return N(t)?t:void 0},N=function(e){return e.string.length>=u.minLinkifyLength&&Object(r.N)(e.string)&&!(M(e)&&A(e))},C=function(e){var t=e.getSelection(),n=t.getAnchorKey(),i=e.getCurrentContent().getBlockForKey(n),o=i.getText(),r=t.getEndOffset(),l=o.lastIndexOf(" ",r)+1;return{string:o.slice(l,r),block:i,blockKey:n,index:l,endIndex:r}},M=function(e){for(var t=e.block,n=e.index,i=e.endIndex,o=n;o<i;o++)if(null!==t.getEntityAt(o))return!0;return!1},A=function(e){var t=e.block,n=e.string;return t.getText().length>n.length};return Object(i.E)(d({theme:n,toolbar:T,type:"LINK",anchorTarget:l,relValue:c,settings:u,commonPubsub:p,defaultPluginData:I},m),{decorators:L,handleBeforeInput:function(e,t,n,i){return/\s/.test(e)&&(y=_(t)),"not-handled"},handleReturn:function(t,n,i){if(function(t){var n;return t&&"unstyled"===(null===(n=t.block)||void 0===n?void 0:n.getType())&&e["wix-draft-plugin-link-preview"]}(y=_(n))){var r=function(e){var t=e.string;if(e.block.getText()===t)return t}(y),l=null==y?void 0:y.block.getKey();r&&l&&function(e,t,n,i){return l=function(){var r,l,a,c,s,u,p,d,m,v,k,y,w,O,j,x,T,L;return function(e,t){var n,i,o,r,l={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return r={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r;function a(r){return function(a){return function(r){if(n)throw new TypeError("Generator is already executing.");for(;l;)try{if(n=1,i&&(o=2&r[0]?i.return:r[0]?i.throw||((o=i.return)&&o.call(i),0):i.next)&&!(o=o.call(i,r[1])).done)return o;switch(i=0,o&&(r=[2&r[0],o.value]),r[0]){case 0:case 1:o=r;break;case 4:return l.label++,{value:r[1],done:!1};case 5:l.label++,i=r[1],r=[0];continue;case 7:r=l.ops.pop(),l.trys.pop();continue;default:if(!((o=(o=l.trys).length>0&&o[o.length-1])||6!==r[0]&&2!==r[0])){l=0;continue}if(3===r[0]&&(!o||r[1]>o[0]&&r[1]<o[3])){l.label=r[1];break}if(6===r[0]&&l.label<o[1]){l.label=o[1],o=r;break}if(o&&l.label<o[2]){l.label=o[2],l.ops.push(r);break}o[2]&&l.ops.pop(),l.trys.pop();continue}r=t.call(e,l)}catch(a){r=[6,a],i=0}finally{n=o=0}if(5&r[0])throw r[1];return{value:r[0]?r[1]:void 0,done:!0}}([r,a])}}}(this,(function(E){switch(E.label){case 0:return r=i.split("\u21b5").join(""),l=t["wix-draft-plugin-link-preview"]||{},a=l.fetchData,c=l.enableEmbed,s=void 0===c||c,u=l.enableLinkPreview,p=void 0===u||u,d=t.setEditorState,[4,a(r)];case 1:return m=E.sent(),v=m.thumbnail_url,k=m.title,y=m.description,w=m.html,O=m.provider_url,(h(w,s,r)||f(k,v,p))&&(j=Object(o.T)(e,n),x=b(b({},g),l).config,T={config:b(b({},x),{link:b({url:r},x.link),width:w&&350}),thumbnail_url:v,title:k,description:y,html:w,provider_url:O},L=Object(o.N)(j,T,"wix-draft-plugin-link-preview").newEditorState,d(o.G.insertSoftNewline(L))),[2]}}))},new((r=void 0)||(r=Promise))((function(e,t){function n(e){try{o(l.next(e))}catch(n){t(n)}}function i(e){try{o(l.throw(e))}catch(n){t(n)}}function o(t){var o;t.done?e(t.value):(o=t.value,o instanceof r?o:new r((function(e){e(o)}))).then(n,i)}o((l=l.apply(void 0,[])).next())}));var r,l}(n,e,l,r)}return"not-handled"},onChange:function(e){var t=e.getSelection();Object(o.pb)(e)&&t.isCollapsed()&&t.getHasFocus()?setTimeout((function(){var e;e={type:"LINK",boundingRect:Object(o.ob)(window)},p.set("cursorOnInlinePlugin",e)})):E();var n=e;return function(e){var t=e.getCurrentContent(),n=t!==j;return j=t,n&&"insert-fragment"===e.getLastChangeType()}(e)?n=Object(o.V)(e,{anchorTarget:l,relValue:c}):y&&(n=function(e,t){var n=e.string,i=e.index,r=e.endIndex,a=e.blockKey;return Object(o.sb)(t,a,i,r,{url:n,anchorTarget:l,relValue:c,targetBlank:v,nofollow:k})}(y,e)),y=void 0,n}})},N=function(e){return{config:d(d({},I.config),e),type:"LINK",createPlugin:_,ModalsMap:{}}}},220:function(e){e.exports=JSON.parse('{"$schema":"http://json-schema.org/draft-07/schema#","$id":"https://wix-rich-content/link-content-data-schema.json","type":"object","definitions":{},"properties":{"href":{"$id":"/properties/href","type":"string","title":"href","default":"","examples":["wix.com"]},"rel":{"$id":"/properties/rel","type":"string","title":"rel","default":"noopener","examples":["nofollow","noopener","noreferrer"]},"target":{"$id":"/properties/target","type":"string","title":"target","default":"_self","examples":["_blank","_top","_self"]},"url":{"$id":"/properties/url","type":"string","title":"URL","default":"","examples":["wix.com"]}},"required":["url"]}')}}]);