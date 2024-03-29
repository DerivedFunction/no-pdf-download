# No PDF Download

## New functionality
Added a popup UI and an option to whitelist several URLS. Compatible with both Firefox and Chrome (for now) using manifest v2.
![HTML popup and whitelist UI](https://github.com/DerivedFunction/no-pdf-download/assets/81781562/c1305dae-828b-437b-a7b3-58f04f37c951)

While most PDF files can be viewed directly in the browser some PDFs will trigger a "Save as"-dialog or will be downloaded automatically. This addon views all PDF files directly in the browser. You can still save the PDF by pressing CTRL+S (or CMD+S) after viewing them.

## Instructions 
### (Firefox)
1. Get Firefox Developer and go to `about:config` --> `xpinstall.signatures.required=true` to allow unverified addons
2. Install [`web-ext`](https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/).
3. Go to the directory of `manifest.json` and run `web-ext build`
4. Go to `about:addons` and install this addon from file (a `zip` file)
### Chrome
Note: [manifest v2 is to be deprecated soon](https://developer.chrome.com/docs/extensions/develop/migrate/mv2-deprecation-timeline)
1. Go to `chrome://extensions` and enable Developer mode
2. Click the button "Load unpacked" and select the  `manifest.json` file 
