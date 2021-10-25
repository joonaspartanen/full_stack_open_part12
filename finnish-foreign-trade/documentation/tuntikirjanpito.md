# Tuntikirjanpito

| pvm | tuntia | kuvaus |
| --- | ------ | ------ |
| 10.8. | 2 | Suunnittelua, Uljas API:in ja datavisualisointiin tarkoitettuihin JavaScript-kirjastoihin tutustumista. |
| 11.8. | 1 | Repositorion luonti, README.md, frontendin ja backendin alustus. |
| 11.8. | 1 | Backendin 1. versio, joka tekee kovakoodatun API-pyynnön ja palauttaa tuloksen JSON-muodossa. |
| 11.8. | 1 | Frontendin 1. versio. |
| 12.8. | 1 | Frontendin kehitystä (listaa nyt maa- ja vuosikohtaiset kauppatilastot). |
| 12.8. | 2 | Tutustuttu amcharts:n dokumentaatioon ja otettu se käyttöön frontendissä. |
| 13.8. | 2 | Frontend hakee backendistä vuoden 2018 tuontitiedot ja visualisoi ne alustavasti koropleettikartalle. |
| 13.8. | 1 | Frontendiin lähetettävää dataa muokataan backendissä. Selvitetty koropleettikarttojen teoriaa (erilaiset tiedonluokittelutavat). |
| 14.8. | 1 | Backend luokittelee nyt datan kuuteen eri suuruusluokkaan ennen frontendiin lähettämistä. |
| 14.8. | 1 | Lisätty frontendiin alustava ratkaisu, jonka avulla voi tarkastella joko tuontia tai vientiä. |
| 14.8. | 1 | Tutustuttu Material UI:n dokumentaatioon. Otettu Material UI alustavasti käyttöön frontendissä. |
| 15.8. | 2 | Tutustuttu amcharts:n kaaviodokumentaatioon. 1. versio kauppataseen 2002–2018 kuvaajasta. Backend muokkaa datan tarvittavaan muotoon. |
| 18.8. | 2 | 2. versio kauppataseen kuvaajasta. Refaktoroitu backendiä. Backendiin lisätty ensimmäiset yksikkötestit. |
| 18.8. | 1 | Lisätty mahdollisuus hakea tuonti- ja vientitietoja tuotekoodeittain. 1. versio tuoteryhmäkuvaajasta. |
| 18.8. | 1 | Refaktoroitu backendiä. Vaihdettu frontendissä React Bootstrapiin. |
| 18.8. | 2 | Paranneltu frontendin ulkoasua. 3. versio kauppataseen kuvaajasta. |
| 19.8. | 2 | Ulkoasun parantelua. 1. Heroku-versio. |
| 19.8. | 1 | Lisätty nuolet, joilla skrollata näkymästä toiseen. |
| 20.-21.8. | 4 | Refaktoroitu frontendiä. Lisätty omaa CSS:ää. Lisää datan käsittelyä backendissä. |
| 22.8. | 2 | Lisätty valikko. Kauppatasekuvaajaan lisätty varsinainen kauppatase (vienti-tuonti). Ulkoasun ja värien säätöä. |
| 26.8. | 2 | Lisätty backendiin mahdollisuus hakea maakohtaisia tullitietoja. |
| 20.12. | 1 | Tutustuttu amchart:n TreeMap-dokumentaatioon.
| 10.2. | 2 | Backendin refaktorointia. Uusia testejä. Testeihin apumetodeja.
| 11.2. | 2 | TreeMap-komponentin 1. versio. Backendin kontrolleri muokattu mappaamaan (tuonti)datan tarvittavaan muotoon.
| 12.2. | 2 | TreeMap-komponentin 2. versio oikealla datalla. Backendissä sovelluslogiikkaa siirretty service-tasolle ja funktioita pilkottu.
| 13.2. | 3 | Otettu cache käyttöön backendissä. Refaktorointia. Frontendissä pienellä kikkailulla saatu React-komponentti luomaan useita amcharts-kaavioita eri id-attribuuteilla. CI pipelinen 1. versio.
| 18.2. | 2 | Frontendin siistimistä. Ensimmäiset yksikkötestit backendin service-funktioille.
| 19.2. | 2 | Backendin sovelluslogiikkaa siirretty service-tasolla. Endpointit sekä maakohtaisten tuonti- että vientitilastojen hakua varten. Frontendiin lisätty alustava komponentti näiden näyttämiseksi.
| 20.2. | 1.5 | Tutkittu Uljas apin dokumentaatiosta, miten haetaan lista maakoodeista. Lisätty backendiin endpoint maakoodien hakemiseksi sekä pilkottu funktioita.
| 20.2. | 1.5 | Frontendiin lisätty servicefunktio ja alustava komponentti maakohtaisen tiedon hakemiseksi. Pienen debuggauksen jälkeen hakee ja näyttääkin jo oikeat tiedot.
| 22.2. | 2 | Refaktoiroitu maakohtaisen tiedon haku frontendissä järkevämmäksi. Vaihdettu tyylikirjasto semantic-ui:hin. Lisättty uudet valikko- ja footer-komponentit.
| 29.2. | 2 | Uusi siistimpi komponentti maakohtaisen tiedon hakuun. Lisätty komponentin ehdollinen renderöinti ja loading-spinneri. UI-parannuksia. Bootstrap viittauksia vaihdettu Semantic UI:hin.
| 1.3. | 3 | Päivitetty hakukomponentti niin, että se tarjoaa maiden nimiä listasta. UI:ta siistitty edelleen. Backendissä pieni muutos apufunktiossa.
| 2.3. | 1 | Pieniä UI-muutoksia. Ensimmäiset testit frontendiin.
| 4.3. | 3 | AmChartsin responsiivisuus-ominaisuuksiin tutustumista. Mobiilinäkymän parantamista. Frontendiin selkeämpi hakemistorakenne.
| 5.3. | 2 | Lisää testejä frontendiin. Frontend-testien suoritus lisätty CI-pipelineen.
| 7.-8.3. | 3 | Lisätty backendiin endpoint, josta voi hakea SITC2-vienti- ja tuontitiedot yhdessä. Frontendiin lisätty mahdollisuus valita kummat näytetään treemapissa. Valmisteltu vuoden valintaa frontendissä.
| 8.3. | 2 | Lisätty mahdollisuus valita vuosi, jonka data haetaan. Tätä varten lisätty valikko frontendiin ja backendissä tehty tarvittavat muutokset routereihin.
| 7.4. | 2 | Otettu redux, react-redux ja redux-thunk alustavasti käyttöön. Siirretty tuonti- ja vientitiedot redux storeen.
| 8.4. | 2 | Viety sovelluksen tilasta suurin osa (myös kaupan suunta ja maakoodit) redux-storeen.
| 5.7. | 4 | Tutustuttu d3.js:n dokumentaatioon ja aloitettu amcharts-kaavioiden mahdollinen korvaaminen d3:lla (haara d3js)
| 6.7. | 2 | Debugattu redux storen hitautta. Otettu node-sass käyttöön.
| 9.7. | 4 | Paranneltu kartassa näytettävän datan (vienti/tuonti) päivityslogiikkaa, tuloksena paljon entistä sujuvampi näkymän päivitys. Refaktoitu karttakomponenttia toiston poistamiseksi.
| 10.7. | 4 | Muokattu sovelluksen tyylejä. Luotu light/dark mode -valintamahdollisuus.
| 11.7. | 2 | Mockattu redux-store testissä. Viritelty CD-putkea Github Actioniin (vielä tuloksetta).
| 12.7. | 5 | Korvattu kauppatasekuvaaja omalla d3.js-toteutuksella. Redux-storen rakennetta selkiytetty.
| 15.7. | 3 | D3.js-kauppatasekuvaajaan lisätty hiirtä seuraava tooltip ja selite. Kuvaajan ulkoasua parannettu.
| 15.7. | 1 | Uudelleenjärjestetty CSS-muotoilut pienemmiksi SCSS-tiedostoiksi, jotka käännetään skriptillä yhdeksi CSS-tiedostoksi.
| 16.7. | 3 | Refaktoroitu oma d3.js-komponentti pienemmiksi funktioiksi ja lisätty resize-tapahtumankäsittelijä.
| 18.7. | 3 | Refaktoroitu frontendin koodia ja päivitetty sovelluksen tyylejä.
| 19.7. | 3 | Muutettu repositorion kansiorakenne järkevämmäksi. Refaktoroitu backendin ylisuuria moduuleja pienemmiksi. Korjattu testejä.
| 22.7. | 3 | Refaktoroitu backendiä ja lisätty kontrolleri vuotuisen kauppakumppanirankingin laskemiseksi ja hakemiseksi.
| Yhteensä | 109 | |
