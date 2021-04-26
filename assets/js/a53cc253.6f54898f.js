(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{140:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return m})),n.d(t,"metadata",(function(){return h})),n.d(t,"toc",(function(){return u})),n.d(t,"default",(function(){return g}));var a=n(3),i=n(7),o=n(0),r=n.n(o),l=n(152),c=n(173),s=(n(56),n(316)),b=function(){var e=document.createElement("div");return Object(o.useEffect)((function(){var t=document.getElementById("editor-static-toolbar-wrapper");t&&t.appendChild(e)}),[]),r.a.createElement("div",{className:"card",id:"editor-static-toolbar-wrapper"},r.a.createElement(c.a,{toolbarSettings:{textToolbarContainer:e},content:s}))},d=n(8);var p=function(e){var t=e.children,n=e.fallback;return d.a.canUseDOM&&null!=t?r.a.createElement(r.a.Fragment,null,t()):n||null},m={id:"ricos-api",title:"Ricos API",sidebar_label:"Ricos API"},h={unversionedId:"ricos/ricos-api",id:"ricos/ricos-api",isDocsHomePage:!1,title:"Ricos API",description:"Ricos Common API",source:"@site/docs/ricos/ricos-api.mdx",slug:"/ricos/ricos-api",permalink:"/docs/ricos/ricos-api",editUrl:"https://github.com/wix/ricos/edit/master/website/docs/ricos/ricos-api.mdx",version:"current",sidebar_label:"Ricos API",sidebar:"api",next:{title:"EditorEventsContext",permalink:"/docs/ricos/editor-events-context"}};Object(l.b)(p,{fallback:Object(l.b)("div",null)},b);var u=[{value:"Ricos Common API",id:"ricos-common-api",children:[{value:"<code>children</code>",id:"children",children:[]},{value:"<code>content</code>",id:"content",children:[]},{value:"<code>cssOverride</code>",id:"cssoverride",children:[]},{value:"<code>isMobile</code>",id:"ismobile",children:[]},{value:"<code>linkSettings</code>",id:"linksettings",children:[]},{value:"<code>locale</code>",id:"locale",children:[]},{value:"<code>mediaSettings</code>",id:"mediasettings",children:[]},{value:"<code>onError</code>",id:"onerror",children:[]},{value:"<code>plugins</code>",id:"plugins",children:[]},{value:"<code>theme</code>",id:"theme",children:[]}]},{value:"Ricos Editor API",id:"ricos-editor-api",children:[{value:"<code>draftEditorSettings</code>",id:"drafteditorsettings",children:[]},{value:"<code>injectedContent</code>",id:"injectedcontent",children:[]},{value:"<code>linkPanelSettings</code>",id:"linkpanelsettings",children:[]},{value:"<code>maxTextLength</code>",id:"maxtextlength",children:[]},{value:"<code>modalSettings</code>",id:"modalsettings",children:[]},{value:"<code>onBusyChange</code>",id:"onbusychange",children:[]},{value:"<code>onChange</code>",id:"onchange",children:[]},{value:"<code>placeholder</code>",id:"placeholder-1",children:[]},{value:"<code>ref</code>",id:"ref",children:[]},{value:"<code>toolbarSettings</code>",id:"toolbarsettings",children:[]}]},{value:"Ricos Viewer API",id:"ricos-viewer-api",children:[{value:"<code>preview</code>",id:"preview",children:[]},{value:"<code>seoSettings</code>",id:"seosettings",children:[]}]}],j={toc:u};function g(e){var t=e.components,n=Object(i.a)(e,["components"]);return Object(l.b)("wrapper",Object(a.a)({},j,n,{components:t,mdxType:"MDXLayout"}),Object(l.b)("h2",{id:"ricos-common-api"},"Ricos Common API"),Object(l.b)("h3",{id:"children"},Object(l.b)("inlineCode",{parentName:"h3"},"children")),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-jsx"},"children?: RichContentEditor | RichContentViewer\n")),Object(l.b)("p",null,"For backward compatibility. Any prop given to the child component will deeply override the matching prop created in Ricos' internal logic.\nRead more about backward compatibility in ",Object(l.b)("a",{parentName:"p",href:"./migrations/migrating-from-rich-content"},"Migrating from rich-content")),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-jsx",metastring:"{2}","{2}":!0},"<RicosEditor>\n  <RichContentEditor placeholder={'Type here!'} />\n</RicosEditor>\n")),Object(l.b)("h3",{id:"content"},Object(l.b)("inlineCode",{parentName:"h3"},"content")),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-jsx"},"content?: DraftContent\n")),Object(l.b)("p",null,"A ",Object(l.b)("inlineCode",{parentName:"p"},"DraftContent")," is an immutable object that saves the entire content created by a ",Object(l.b)("inlineCode",{parentName:"p"},"RicosEditor"),". For ",Object(l.b)("inlineCode",{parentName:"p"},"RicosViewer")," this is a requirement, it will set the content to display. For the ",Object(l.b)("inlineCode",{parentName:"p"},"RicosEditor")," this will set its initial state."),Object(l.b)("h3",{id:"cssoverride"},Object(l.b)("inlineCode",{parentName:"h3"},"cssOverride")),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-jsx"},"cssOverride?: RicosCssOverride\n")),Object(l.b)("p",null,"CSS class overriding that will be passed to ",Object(l.b)("inlineCode",{parentName:"p"},"RichContentEditor")," or ",Object(l.b)("inlineCode",{parentName:"p"},"RichContentViewer"),"."),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-jsx"},"<RicosEditor\n  cssOverride={{\n    modalTheme: {\n      content: { zIndex: 1 },\n      overlay: { width: '100%' },\n    },\n  }}\n/>\n")),Object(l.b)("div",{className:"admonition admonition-note alert alert--secondary"},Object(l.b)("div",{parentName:"div",className:"admonition-heading"},Object(l.b)("h5",{parentName:"div"},Object(l.b)("span",{parentName:"h5",className:"admonition-icon"},Object(l.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},Object(l.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),Object(l.b)("div",{parentName:"div",className:"admonition-content"},Object(l.b)("p",{parentName:"div"},"Works similarly to the ",Object(l.b)("inlineCode",{parentName:"p"},"theme")," property of ",Object(l.b)("inlineCode",{parentName:"p"},"RichContentEditor")," and ",Object(l.b)("inlineCode",{parentName:"p"},"RichContentViewer"),"."))),Object(l.b)("h3",{id:"ismobile"},Object(l.b)("inlineCode",{parentName:"h3"},"isMobile")),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-jsx"},"isMobile?: boolean\n")),Object(l.b)("p",null,"Will render in mobile optimized mode"),Object(l.b)("h3",{id:"linksettings"},Object(l.b)("inlineCode",{parentName:"h3"},"linkSettings")),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-jsx"},"linkSettings?: {\n  anchorTarget?: string;\n  relValue?: string;\n}\n")),Object(l.b)("p",null,"Defines the behavior of links.\nanchorTarget - as defined in ",Object(l.b)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target"},"HTMLAnchorElement.target"),"\nrelValue - as defined in ",Object(l.b)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/API/HTMLAnchorElement/rel"},"HTMLAnchorElement.rel")),Object(l.b)("h3",{id:"locale"},Object(l.b)("inlineCode",{parentName:"h3"},"locale")),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-jsx"},"locale?: string\n")),Object(l.b)("p",null,"Any two letter string represing a ",Object(l.b)("a",{parentName:"p",href:"https://github.com/wix/ricos/tree/master/packages/common/web/statics/locale"},"supported")," locale. Determines the language and text direction."),Object(l.b)("h3",{id:"mediasettings"},Object(l.b)("inlineCode",{parentName:"h3"},"mediaSettings")),Object(l.b)("p",null,"When changing fullscreen's background and foreground colors, make sure to choose colors that aren't too similar. ",Object(l.b)("br",null),"\ndefault colors are: ",Object(l.b)("br",null),"\nbackgroundColor: 'white';\nforegroundColor: 'black'; ",Object(l.b)("br",null),"\nThe string values should be css color strings (e.g ",Object(l.b)("inlineCode",{parentName:"p"},"'black'"),", ",Object(l.b)("inlineCode",{parentName:"p"},"'#2F2E2E'"),", etc) ",Object(l.b)("br",null)),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-jsx"},"\nmediaSettings?: {\n  pauseMedia?: boolean;\n  disableDownload?: boolean;\n  fullscreenProps?: {\n  backgroundColor?: string;\n  foregroundColor?: string;\n}\n}\n")),Object(l.b)("h4",{id:"pausemedia"},Object(l.b)("inlineCode",{parentName:"h4"},"pauseMedia")),Object(l.b)("p",null,"When ",Object(l.b)("inlineCode",{parentName:"p"},"true"),", media like videos will be paused.\nA possible use case is for pausing videos on tab switch."),Object(l.b)("h4",{id:"disablerightclick-deprecated"},Object(l.b)("inlineCode",{parentName:"h4"},"disableRightClick")," (deprecated)"),Object(l.b)("p",null,"Disables the mouse right click functionality for the gallery, video and image plugins."),Object(l.b)("h4",{id:"disabledownload"},Object(l.b)("inlineCode",{parentName:"h4"},"disableDownload")),Object(l.b)("p",null,"Sets the initial value of disableDownload for image, gallery and video plugins.\nImages - disables right click.\nGallery - disables right click.\nVideo - removes the download option from context menu."),Object(l.b)("h3",{id:"onerror"},Object(l.b)("inlineCode",{parentName:"h3"},"onError")),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-jsx"},"onError?: (error: string) => void\n")),Object(l.b)("p",null,"TODO"),Object(l.b)("h3",{id:"plugins"},Object(l.b)("inlineCode",{parentName:"h3"},"plugins")),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-jsx"},"plugins?: PluginConfig[]\n")),Object(l.b)("p",null,"For every plugin you install, import it and add it to the plugins array."),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-jsx"},"import { RicosEditor } from 'ricos-editor';\n\nimport { pluginVideo } from 'wix-rich-content-plugin-video';\nimport 'wix-rich-content-plugin-video/dist/styles.min.css';\n\n<RicosEditor plugins={[pluginVideo()]} />;\n")),Object(l.b)("div",{className:"admonition admonition-note alert alert--secondary"},Object(l.b)("div",{parentName:"div",className:"admonition-heading"},Object(l.b)("h5",{parentName:"div"},Object(l.b)("span",{parentName:"h5",className:"admonition-icon"},Object(l.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},Object(l.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),Object(l.b)("div",{parentName:"div",className:"admonition-content"},Object(l.b)("p",{parentName:"div"},"For rendering a viewer, import the plugin from the viewer entry point ",Object(l.b)("br",null)," ",Object(l.b)("inlineCode",{parentName:"p"},"wix-rich-content-plugin-video/dist/module.viewer")))),Object(l.b)("h3",{id:"theme"},Object(l.b)("inlineCode",{parentName:"h3"},"theme")),Object(l.b)("p",null,"Adding theme to Ricos is possible with providing a ",Object(l.b)("inlineCode",{parentName:"p"},"RicosTheme")," object.\nFurther read in ",Object(l.b)("a",{parentName:"p",href:"./Theming"},"Theming")," page."),Object(l.b)("h2",{id:"ricos-editor-api"},"Ricos Editor API"),Object(l.b)("h3",{id:"drafteditorsettings"},Object(l.b)("inlineCode",{parentName:"h3"},"draftEditorSettings")),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-jsx"},"draftEditorSettings?: {\n  autoCapitalize?: string;\n  autoComplete?: string;\n  autoCorrect?: string;\n  spellCheck?: boolean;\n  stripPastedStyles?: boolean;\n  handleBeforeInput?: ((chars: string, editorState: EditorState, eventTimeStamp: number) => 'handled' | 'not-handled');\n  handlePastedText?: ((text: string, html: string, editorState: EditorState) => 'handled' | 'not-handled');\n  handleReturn?: ((e: SyntheticKeyboardEvent, editorState: EditorState) => 'handled' | 'not-handled');\n  tabIndex?: string;\n}\n")),Object(l.b)("p",null,"draft-js props, as described in ",Object(l.b)("a",{parentName:"p",href:"https://draftjs.org/docs/api-reference-editor"},"https://draftjs.org/docs/api-reference-editor")),Object(l.b)("h3",{id:"injectedcontent"},Object(l.b)("inlineCode",{parentName:"h3"},"injectedContent")),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre"},"injectedContent?: DraftContent\n")),Object(l.b)("p",null,"Similar to ",Object(l.b)("a",{parentName:"p",href:"#content"},"content")," prop; allows content to be injected to mounted RicosEditor without need for remount."),Object(l.b)("h3",{id:"linkpanelsettings"},Object(l.b)("inlineCode",{parentName:"h3"},"linkPanelSettings")),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-jsx"},"linkPanelSettings?: {\n  blankTargetToggleVisibilityFn?: (anchorTarget: string) => boolean;\n  nofollowRelToggleVisibilityFn?: (relValue: string) => boolean;\n  placeholder?: string;}\n")),Object(l.b)("p",null,"Settings for the link panel component."),Object(l.b)("h4",{id:"blanktargettogglevisibilityfn"},Object(l.b)("inlineCode",{parentName:"h4"},"blankTargetToggleVisibilityFn")),Object(l.b)("p",null,"Determines the 'Open link in a new tab' link panel checkbox visiblity.\nBy default, its predicate is ",Object(l.b)("inlineCode",{parentName:"p"},"anchorTarget !== '_blank'")),Object(l.b)("h4",{id:"nofollowreltogglevisibilityfn"},Object(l.b)("inlineCode",{parentName:"h4"},"nofollowRelToggleVisibilityFn")),Object(l.b)("p",null,"Determines the 'Add a nofollow tag' link panel checkbox visiblity.\nBy default, its predicate is ",Object(l.b)("inlineCode",{parentName:"p"},"relValue !== 'nofollow'")),Object(l.b)("h4",{id:"placeholder"},Object(l.b)("inlineCode",{parentName:"h4"},"placeholder")),Object(l.b)("p",null,"Determines the placeholder to use for the link panel.\nBy default, its value is ",Object(l.b)("inlineCode",{parentName:"p"},'"Enter a URL here"')," translated by localization"),Object(l.b)("h3",{id:"maxtextlength"},Object(l.b)("inlineCode",{parentName:"h3"},"maxTextLength")),Object(l.b)("p",null,"Limits the editor text length to a given value. When the max text length is reached, further text input is ignored. Also, text paste action is canceled if the resulting text would exceed the max length."),Object(l.b)("h3",{id:"modalsettings"},Object(l.b)("inlineCode",{parentName:"h3"},"modalSettings")),Object(l.b)("p",null,"Customise the ",Object(l.b)("inlineCode",{parentName:"p"},"ReactModal")," of ",Object(l.b)("inlineCode",{parentName:"p"},"RicosEditor"),", or alternatively provide callbacks to create your own Modal."),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-jsx"},"modalSettings?: {\n  ariaHiddenId?: string;\n  openModal?: (modalProps: object) =>  void;\n  closeModal?: () =>  void;\n  container?: HTMLElement;\n}\n")),Object(l.b)("h4",{id:"container"},Object(l.b)("inlineCode",{parentName:"h4"},"container")),Object(l.b)("p",null,"When used, ",Object(l.b)("inlineCode",{parentName:"p"},"container")," will be the target of Ricos editor modal (using ReactDOM.createPortal)"),Object(l.b)("h4",{id:"ariahiddenid"},Object(l.b)("inlineCode",{parentName:"h4"},"ariaHiddenId")),Object(l.b)("p",null,"Accessibility prop.\nProvides ",Object(l.b)("inlineCode",{parentName:"p"},"aria-hidden")," attribute to a given DOM Element ID while the modal is open, making it hidden for screenreaders of users.\nPassed directly into the ",Object(l.b)("inlineCode",{parentName:"p"},"ReactModal"),"'s ",Object(l.b)("a",{parentName:"p",href:"https://reactcommunity.org/react-modal/accessibility/#app-element"},"AppElement"),"."),Object(l.b)("p",null,"Default Value: ",Object(l.b)("inlineCode",{parentName:"p"},"body")),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-jsx"},"<RicosEditor modalSettings={{ ariaHiddenId: '#root' }} />\n")),Object(l.b)("h4",{id:"openmodal--closemodal"},Object(l.b)("inlineCode",{parentName:"h4"},"openModal")," & ",Object(l.b)("inlineCode",{parentName:"h4"},"closeModal")),Object(l.b)("p",null,"Legacy RCE's ",Object(l.b)("inlineCode",{parentName:"p"},"openModal"),", ",Object(l.b)("inlineCode",{parentName:"p"},"closeModal")," (helpers)","[rce_api/helpers]","."),Object(l.b)("div",{className:"admonition admonition-note alert alert--secondary"},Object(l.b)("div",{parentName:"div",className:"admonition-heading"},Object(l.b)("h5",{parentName:"div"},Object(l.b)("span",{parentName:"h5",className:"admonition-icon"},Object(l.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},Object(l.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),Object(l.b)("div",{parentName:"div",className:"admonition-content"},Object(l.b)("p",{parentName:"div"},"Leave these empty if you don't plan to use a Modal Component of your own. Otherwise, ",Object(l.b)("inlineCode",{parentName:"p"},"RicosEditor")," will assume you do, and won't handle the ",Object(l.b)("inlineCode",{parentName:"p"},"ReactModal")," it's supplied with."))),Object(l.b)("h3",{id:"onbusychange"},Object(l.b)("inlineCode",{parentName:"h3"},"onBusyChange")),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-jsx"},"onBusyChange?: (isBusy: boolean) => void\n")),Object(l.b)("p",null,"A function that will be called with ",Object(l.b)("inlineCode",{parentName:"p"},"true")," when the editor is busy, e.g. when a media plugin begins uploading, and will be called with ",Object(l.b)("inlineCode",{parentName:"p"},"false")," when the editor becomes idle again."),Object(l.b)("h3",{id:"onchange"},Object(l.b)("inlineCode",{parentName:"h3"},"onChange")),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-jsx"},"onChange?: (content: DraftContent) => void\n")),Object(l.b)("p",null,"A callback that runs whenever the editor's content is edited."),Object(l.b)("h3",{id:"placeholder-1"},Object(l.b)("inlineCode",{parentName:"h3"},"placeholder")),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-jsx"},"placeholder?: string\n")),Object(l.b)("p",null,"This text will appear in the editor until content is created"),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-jsx"},"<RicosEditor placeholder={'The placeholder appears until you start typing'} />\n")),Object(l.b)("div",{className:"card"},Object(l.b)(c.a,{placeholder:"The placeholder appears until you start typing",mdxType:"RicosEditor"})),Object(l.b)("h3",{id:"ref"},Object(l.b)("inlineCode",{parentName:"h3"},"ref")),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-jsx"},"ref?: React.Ref\n")),Object(l.b)("p",null,"A react ",Object(l.b)("a",{parentName:"p",href:"https://reactjs.org/docs/refs-and-the-dom.html"},"Ref"),". Use this to access editor functions."),Object(l.b)("table",null,Object(l.b)("thead",{parentName:"table"},Object(l.b)("tr",{parentName:"thead"},Object(l.b)("th",{parentName:"tr",align:null},"Function"),Object(l.b)("th",{parentName:"tr",align:null},"Description"))),Object(l.b)("tbody",{parentName:"table"},Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",{parentName:"tr",align:null},Object(l.b)("inlineCode",{parentName:"td"},"focus(): void")),Object(l.b)("td",{parentName:"tr",align:null},"Focuses the editor")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",{parentName:"tr",align:null},Object(l.b)("inlineCode",{parentName:"td"},"blur(): void")),Object(l.b)("td",{parentName:"tr",align:null},"Blurs the editor")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",{parentName:"tr",align:null},Object(l.b)("inlineCode",{parentName:"td"},"getContent(): DraftContent")),Object(l.b)("td",{parentName:"tr",align:null},"Retrieves current content")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",{parentName:"tr",align:null},Object(l.b)("inlineCode",{parentName:"td"},"getContentPromise(options: { flush?: boolean; publishId?: string}): Promise<DraftContent>")),Object(l.b)("td",{parentName:"tr",align:null},"Retrieves current content promise")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",{parentName:"tr",align:null},Object(l.b)("inlineCode",{parentName:"td"},"getContentTraits(): { isEmpty: boolean; isContentChanged: boolean; isLastChangeEdit: boolean}")),Object(l.b)("td",{parentName:"tr",align:null},"Retrieves current content traits")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",{parentName:"tr",align:null},Object(l.b)("inlineCode",{parentName:"td"},"getToolbarProps(options: { type: ToolbarType }): { buttons: ToolbarButtonProps[] }")),Object(l.b)("td",{parentName:"tr",align:null},"button props for external toolbar")))),Object(l.b)("h4",{id:"usage-example"},"Usage example:"),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-jsx"},"class MyComponent extends React.Component {\n  componentDidMount() {\n    this.editor.focus();\n  }\n  render() {\n    <RicosEditor ref={editor => (this.editor = editor)} />;\n  }\n}\n")),Object(l.b)("h4",{id:"refgetcontentpromise"},Object(l.b)("inlineCode",{parentName:"h4"},"ref.getContentPromise")),Object(l.b)("p",null,"Returns (promise) of the Content Data (DraftContent type).\npublishId - used for BI (",Object(l.b)("inlineCode",{parentName:"p"},"onPublish")," event), set it when called before publishing a an editor's content in your app.\nflush - trigger blur of the editor to force changes (such as composition mode in android) before getting the content"),Object(l.b)("h3",{id:"toolbarsettings"},Object(l.b)("inlineCode",{parentName:"h3"},"toolbarSettings")),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-jsx"},"toolbarSettings?: {\n  getToolbarSettings?: GetToolbarSettings;\n  textToolbarContainer?: HTMLElement;\n  useStaticTextToolbar?: boolean;\n}\n")),Object(l.b)("h4",{id:"gettoolbarsettings"},Object(l.b)("inlineCode",{parentName:"h4"},"getToolbarSettings")),Object(l.b)("p",null,"The ",Object(l.b)("inlineCode",{parentName:"p"},"getToolbarSettings")," API allows to config toolbar appearance and behavior."),Object(l.b)("h5",{id:"built-in-editor-and-plugin-toolbars-customization"},"Built-in editor and plugin toolbars customization"),Object(l.b)("p",null,Object(l.b)("a",{parentName:"p",href:"/docs/rce_api/ToolbarCustomization"},"Toolbar Customization")),Object(l.b)("h5",{id:"external-toolbar-customization"},"External toolbar customization"),Object(l.b)("p",null,"Sometimes, the built-in toolbar customization is insufficient. The toolbar externaliztion API comes to solve these cases. It allows users to implement custom toolbars and buttons, providing all the required button props, e.g. onClick callback, button icon, label, tooltip, etc."),Object(l.b)("p",null,"The ",Object(l.b)("inlineCode",{parentName:"p"},"getToolbarSettings")," API allows to configure external toolbars as well. Since external toolbar could be used both for plugin insertion and text formatting, these roles are configured separately. Once the external toolbars are configured, the button props could be retrieved by the editor ref method ",Object(l.b)("inlineCode",{parentName:"p"},"getToolbarProps"),"."),Object(l.b)("h6",{id:"insert-plugin-toolbar"},"Insert plugin toolbar"),Object(l.b)("p",null,"The plugin insertion toolbar configuration object should contain the ",Object(l.b)("inlineCode",{parentName:"p"},"name: TOOLBARS.INSERT_PLUGIN")," field. By default, the ",Object(l.b)("inlineCode",{parentName:"p"},"shouldCreate")," returns false for all the platforms, so it is crucial to override it for button props activation. The ",Object(l.b)("inlineCode",{parentName:"p"},"getButtons")," is expected to return an array of INSERT_PLUGIN_BUTTONS enum values. The default list of the insert plugin button names is passed to the ",Object(l.b)("inlineCode",{parentName:"p"},"getToolbarSettings")," via the ",Object(l.b)("inlineCode",{parentName:"p"},"pluginButtonNames")," argument field."),Object(l.b)("h6",{id:"formatting-toolbar"},"Formatting toolbar"),Object(l.b)("p",null,"The formatting toolbar configuration object should contain the ",Object(l.b)("inlineCode",{parentName:"p"},"name: TOOLBARS.FORMATTING")," field. By default, the ",Object(l.b)("inlineCode",{parentName:"p"},"shouldCreate")," returns false for all the platforms, so it is crucial to override it for button props activation. The ",Object(l.b)("inlineCode",{parentName:"p"},"getButtons")," is expected to return an array of FORMATTING_BUTTONS enum values. The default list of the button names is passed to the ",Object(l.b)("inlineCode",{parentName:"p"},"getToolbarSettings")," via the ",Object(l.b)("inlineCode",{parentName:"p"},"textButtons")," argument field."),Object(l.b)("h4",{id:"texttoolbarcontainer"},Object(l.b)("inlineCode",{parentName:"h4"},"textToolbarContainer")),Object(l.b)("p",null,"Given some container HTML element, the text toolbar will be rendered inside it.\nOverrides ",Object(l.b)("inlineCode",{parentName:"p"},"useStaticTextToolbar"),"."),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-jsx"},"const RicosWithToolbarContainer = () => {\n  const bottomToolbar = document.createElement('div');\n\n  useEffect(() => {\n    const wrappingDiv = document.getElementById('editor-static-toolbar-wrapper');\n    wrappingDiv.appendChild(bottomToolbar);\n  }, []);\n\n  return (\n    <div id=\"editor-static-toolbar-wrapper\">\n      <RicosEditor toolbarSettings={{ textToolbarContainer: bottomToolbar }} />\n    </div>\n  );\n};\n")),Object(l.b)("p",null,"In this example we render the static text toolbar below the editor."),Object(l.b)("h4",{id:"usestatictexttoolbar"},Object(l.b)("inlineCode",{parentName:"h4"},"useStaticTextToolbar")),Object(l.b)("p",null,"The text toolbar appears inline when selecting some text and allows styling text.\nSet to true in order to render the text toolbar in a fixed position ",Object(l.b)("strong",{parentName:"p"},"above")," the editor."),Object(l.b)("div",{className:"card"},Object(l.b)(c.a,{toolbarSettings:{useStaticTextToolbar:!0},content:s,mdxType:"RicosEditor"})),Object(l.b)("h2",{id:"ricos-viewer-api"},"Ricos Viewer API"),Object(l.b)("h3",{id:"preview"},Object(l.b)("inlineCode",{parentName:"h3"},"preview")),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-jsx"},"preview?: {\n  transformation?: ContentStateTransformation;\n  contentInteractionMappers?: Funtion;\n  onPreviewExpand?: () => void;\n}\n")),Object(l.b)("p",null,"A preview decoration for RicosViewer.\nRead more in ",Object(l.b)("a",{parentName:"p",href:"preview"},"Preview")),Object(l.b)("h3",{id:"seosettings"},Object(l.b)("inlineCode",{parentName:"h3"},"seoSettings")),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-jsx"},"seoSettings?: boolean | {\n  paywall: {\n    className: string;\n    index: number;\n  };\n}\n")),Object(l.b)("p",null,"When given a truthy value, renders RicosViewer in a SEO optimized mode.\nAn object allows extended configuration."),Object(l.b)("h4",{id:"paywall"},Object(l.b)("inlineCode",{parentName:"h4"},"paywall")),Object(l.b)("p",null,"className - Content blocked by a payall will be marked up using this string (This class will be used by Googlebot to discern between paid and free content on a page level)\nindex - number of free content blocks"))}g.isMDXComponent=!0},170:function(e,t,n){var a={"./messages_ar.json":[178,75],"./messages_bg.json":[179,76],"./messages_cs.json":[180,77],"./messages_da.json":[181,78],"./messages_de.json":[182,79],"./messages_el.json":[183,80],"./messages_en.json":[172,2],"./messages_es.json":[184,81],"./messages_fi.json":[185,82],"./messages_fr.json":[186,83],"./messages_he.json":[187,84],"./messages_hi.json":[188,85],"./messages_hu.json":[189,86],"./messages_id.json":[190,87],"./messages_it.json":[191,88],"./messages_ja.json":[192,89],"./messages_ko.json":[193,90],"./messages_lt.json":[194,91],"./messages_ms.json":[195,92],"./messages_nl.json":[196,93],"./messages_no.json":[197,94],"./messages_pl.json":[198,95],"./messages_pt.json":[199,96],"./messages_ro.json":[200,97],"./messages_ru.json":[201,98],"./messages_sv.json":[202,99],"./messages_th.json":[203,100],"./messages_tl.json":[204,101],"./messages_tr.json":[205,102],"./messages_uk.json":[206,103],"./messages_vi.json":[207,104],"./messages_zh.json":[208,105]};function i(e){if(!n.o(a,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=a[e],i=t[0];return n.e(t[1]).then((function(){return n.t(i,3)}))}i.keys=function(){return Object.keys(a)},i.id=170,e.exports=i},316:function(e){e.exports=JSON.parse('{"blocks":[{"key":"d79aa","text":"Hi there! I\'m Ricos, your rich content framework. \ud83d\udc7e","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{},"VERSION":"7.5.0"}')}}]);