**TODO**

+ Navigation, einfach, wie bei Mobile 
https://v4-alpha.getbootstrap.com/components/navbar/#toggler
+ Click auf Blog-Post-Titel auf Startseite sollte auf Blog leiten, nicht auf Einzelseite.
+ srcset Images: Bilder in verschiedenen Scales hinterlegen mit srcset. Dies mit media queries für die jeweiligen Bildschirmgrössen laden lassen.

- Tooltip hinter Logo, ist zu hoch, besser ausrichten oder entfernen
- Plone-Product basteln
- Logo? "R"? Rohberg senkrecht
- contact-info gestalten. Link in Header setzen.
- View summary_view of syndicatable collection anpassen, damit ids / anchors existieren:
	 tal:attributes="id python:item_link.split('/')[-1];"
- sharing: auch print anbieten. Siehe NZZ
     <a href="#print" 
	 	onclick="window.print();return false;" 
		target="_blank" class="social__link social__link--print" 
		title="Drucken">
			<svg class="icons icons--print" role="img" title="Drucken">
				<use xlink:href="#printer" xmlns:xlink="http://www.w3.org/1999/xlink"></use>
			</svg>
	</a>



*später*

- TODO: Facebook
- Blog: Kategorien anzeigen


*noch später*

- (-) TinyMCE: 
{
    ...
	, 
    "inline": {
        "inline": "span", 
        "classes": "inline_link"
    }
}
- (-) data-bundle Javscript in index.html
- (-) Links von Proxy konvertieren lassen von roh.rohberg.ch in localhost:3000 (Derzeit quick and dirty mit Javascript)



Unterscheidung debug-mode und production-mode
# development-css = ++theme++rohberg.bergluft/scss/styles.scss
# production-css = ++theme++rohberg.bergluft/scss/styles.css