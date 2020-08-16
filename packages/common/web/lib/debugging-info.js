function formatPluginInfo(plugins) {
  return plugins.reduce((result, plugin) => result + `\t${plugin}\n`, '');
}

export function reportDebuggingInfo({ version, plugins, getContent, getConfig, reporter }) {
  try {
    if (typeof window === 'undefined' || window.__RICOS_INFO__) {
      return;
    }
    window.__RICOS_INFO__ = { getContent, getConfig };
    /* eslint-disable */
    console.info(
`
==============================================
=       ===    ====     =====    =====      ==
=  ====  ===  ====  ===  ===  ==  ===  ====  =
=  ====  ===  ===  ========  ====  ==  ====  =
=  ===   ===  ===  ========  ====  ===  ======
=      =====  ===  ========  ====  =====  ====
=  ====  ===  ===  ========  ====  =======  ==
=  ====  ===  ===  ========  ====  ==  ====  =
=  ====  ===  ====  ===  ===  ==  ===  ====  =
=  ====  ==    ====     =====    =====      ==
==============================================

         ${reporter} v${version}

================ 🔌 PLUGINS ==================

${formatPluginInfo(plugins)}


================ 📜 CONTENT ==================

Please run
    copy(window['__RICOS_INFO__'].getContent())
at any time in this console to get the current
content state into the clipboard.


================ 🛠  CONFIG ===================

Please run
    copy(window['__RICOS_INFO__'].getConfig())
at any time in this console to get the config
data into the clipboard.`);
        /* eslint-enable */
  } catch (_) {}
}
