async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
};

async function arcStyles() {
    const arcStyleObserver = new MutationObserver(() => {
        document.getElementsByTagName('html')[0].style.setProperty('--arc-extension-detect', '');
        document.getElementsByTagName('html')[0].style.setProperty('--arc-palette-foregroundPrimary', '');
        document.getElementsByTagName('html')[0].style.setProperty('--arc-palette-foregroundSecondary', '');
        document.getElementsByTagName('html')[0].style.setProperty('--arc-palette-foregroundTertiary', '');
        document.getElementsByTagName('html')[0].style.setProperty('--arc-palette-maxContrastColor', '');
        document.getElementsByTagName('html')[0].style.setProperty('--arc-palette-minContrastColor', '');
        document.getElementsByTagName('html')[0].style.setProperty('--arc-palette-backgroundExtra', '');
        document.getElementsByTagName('html')[0].style.setProperty('--arc-palette-background', '');
        document.getElementsByTagName('html')[0].style.setProperty('--arc-palette-focus', '');
        document.getElementsByTagName('html')[0].style.setProperty('--arc-palette-hover', '');
        document.getElementsByTagName('html')[0].style.setProperty('--arc-palette-cutoutColor', '');
        document.getElementsByTagName('html')[0].style.setProperty('--arc-palette-title', '');
        document.getElementsByTagName('html')[0].style.setProperty('--arc-palette-subtitle', '');
        document.getElementsByTagName('html')[0].style.setProperty('--arc-background-simple-color', '');
        document.getElementsByTagName('html')[0].style.setProperty('--arc-background-gradient-color0', '');
        document.getElementsByTagName('html')[0].style.setProperty('--arc-background-gradient-color1', '');
        document.getElementsByTagName('html')[0].style.setProperty('--arc-background-gradient-color2', '');
        document.getElementsByTagName('html')[0].style.setProperty('--arc-background-overlay-gradient-color0', '');
        document.getElementsByTagName('html')[0].style.setProperty('--arc-background-overlay-gradient-color1', '');
        document.getElementsByTagName('html')[0].style.setProperty('--arc-background-overlay-gradient-color2', '');
    });
    
    arcStyleObserver.observe(document.getElementsByTagName('html')[0], { attributes: true, attributeFilter: ["style"] });
    document.getElementsByTagName('html')[0].style.setProperty('--arc-extension-detect', 'start');
};

async function tabListener() {
    getCurrentTab().then((tab) => {
        if (tab.id == 0) return undefined;
        if (tab.url?.startsWith("chrome://")) return undefined;
        if (tab.url && (new URL(tab.url).hostname == 'chrome.google.com') && ((new URL(tab.url).pathname + '/').startsWith('/webstore/'))) return undefined;
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: arcStyles,
        });
    });
};

chrome.tabs.onUpdated.addListener(tabListener);