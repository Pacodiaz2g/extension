/*


*/


"use strict";
const keyshodan = localStorage.getItem("keyshodan");
const Enableshodan1 = localStorage.getItem("Enableshodan1");
/******************************************************************************/
async function ipget(argument) {
  try {
    if (await argument == "-1") {
      document.getElementById("infodns").innerHTML += `<span class="badge badge-danger">Shodan doesn't solve the host</span>`;
      return 0;
    }
    var respuestaclass = new httprequest(`https://api.shodan.io/shodan/host/${await argument}?key=${keyshodan}`, "GET");
    var rsq = await respuestaclass.httpsend();
    if (rsq.status != 200) {
      return;
    }
    rsq = JSON.parse(rsq.responseText)
    console.log(rsq)
    document.getElementById("infodns").innerHTML += `<p style="font-size:14px;">ISP: ${rsq['isp']}</p>`;
    document.getElementById("infodns").innerHTML += `<p style="font-size:14px;">Country name: ${rsq['country_name']}</p>`;
    document.getElementById("infodns").innerHTML += `<p style="font-size:14px;">ORG: ${rsq['org']}</p>`;
    document.getElementById("infodns").innerHTML +=
      `<p style="font-size:14px;">IP: <a href="http://${rsq['ip_str']}" target="_blank" rel="noopener noreferrer">${rsq['ip_str']}</a></p>`;
    if (rsq['hostnames'][0] != undefined) {
      document.getElementById("infodns").innerHTML +=
        `<p style="font-size:14px;"><a href="http://${rsq['hostnames'][0]}" target="_blank" rel="noopener noreferrer">${rsq['hostnames'][0]}</a></p>`;
    }
    var i, x = "";
    document.getElementById("infodns").innerHTML +=
      `<p style="font-size:19px;"><a href="https://www.shodan.io/host/${await argument}" target="_blank" rel="noopener noreferrer">Shodan</a></p>`;
    for (var i = 0; i < rsq.ports.length; i++) {
      x = rsq.ports[i];
      document.getElementById("infodns").innerHTML += `<a href="https://www.shodan.io/host/${await argument}" target="_blank" rel="noopener noreferrer">
<div class="Cuadrado" style=" display: flex;"><p style="display: flex;align-items: center;margin: auto auto;">${x}</p></div>
</a>
`;
    }
    document.getElementById("infodns").innerHTML += `<br style="clear:both" />`;
  } catch (e) {
    console.error(e)
  }
}
/******************************************************************************/
async function dnsget(argument) {
  if (Enableshodan1 === "false") {
    document.getElementById("ip").innerHTML = `<span class="badge badge-warning">Shodan is disabled</span>`;
    return -1;
  }
  if (keyshodan === "") {
    document.getElementById("ip").innerHTML = `<span class="badge badge-warning">There is no api key</span>`;
    return -1;
  }
  try {
    var respuestaclass, rsq;
    respuestaclass = new httprequest(`https://api.shodan.io/dns/resolve?key=${keyshodan}&hostnames=${argument}`, "GET");
    rsq = await respuestaclass.httpsend();
    rsq = JSON.parse(rsq.responseText);
    if (rsq[argument] == null) {
      document.getElementById("ip").innerHTML = `<span class="badge badge-danger">Shodan doesn't solve the host</span>`;
      return -1;
    }
    document.getElementById("ip").innerHTML = `<i class="oi oi-globe"></i> ${  xssFilters.inHTMLData(rsq[argument]) }`;
    return rsq[argument];
  } catch (e) {
    document.getElementById("ip").innerHTML = `<span class="badge badge-danger">Error</span>`;
  }
}
/******************************************************************************/
async function getmyipaddres() {
  var respuestaclass = new httprequest(`https://api.shodan.io/tools/myip?key=${keyshodan}`, "GET");
  var rsq = await respuestaclass.httpsend();
  document.getElementById("my-ip").innerHTML = `<p>My ip addres: ${  xssFilters.inHTMLData(rsq.responseText) }</p>`;
  return;
}

chrome.tabs.query({
  active: true,
  currentWindow: true
}, (tabs) => {
  var url = tabs[0].url;
  var tabname = (new URL(url)).hostname;
  var ipad = dnsget(tabname);
  ipget(ipad);
  setTimeout(getmyipaddres, 2000);

});
/******************************************************************************/
