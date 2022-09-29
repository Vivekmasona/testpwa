



/*YTPRO Audio Player*/
function ytproAudPlayer(){
var ytproTitle="";
var ytproURL="";
if("ytplayer" in window){
for(x in ytplayer.config.args.raw_player_response.streamingData.adaptiveFormats){
if(ytplayer.config.args.raw_player_response.streamingData.adaptiveFormats[x].itag == "140"){
if("signatureCipher" in ytplayer.config.args.raw_player_response.streamingData.adaptiveFormats[x]){
ytproTitle=ytplayer.config.args.title ;
ytproURL=ytproGetURL(ytplayer.config.args.raw_player_response.streamingData.adaptiveFormats[x].signatureCipher);
}else{
ytproTitle=ytplayer.config.args.title;
ytproURL=ytplayer.config.args.raw_player_response.streamingData.adaptiveFormats[x].url;
}}}
try{document.getElementById("ytproMainAudDivE").remove();}catch{console.log("");}
var ytproAudDivElem=document.createElement("div");
var ytproAudPlayerElem=document.createElement("audio");
var ytproAudX=document.createElement("div");
ytproAudDivElem.style.position="fixed";
ytproAudDivElem.style.bottom="0";
ytproAudDivElem.style.left="0";
ytproAudDivElem.style.zIndex="99999999999";
ytproAudDivElem.style.height="70px";
ytproAudDivElem.style.width="100%";
ytproAudDivElem.style.background="white";
ytproAudDivElem.setAttribute("id","ytproMainAudDivE");
ytproAudX.style.position="absolute";
ytproAudX.style.left="0px";
ytproAudX.style.height="40px";
ytproAudX.style.width="40px";
ytproAudX.style.background="#04C5B9";
ytproAudDivElem.style.borderTop="3px solid #04C5B9";
ytproAudX.style.borderTop="3px solid #04C5B9";
ytproAudX.style.borderRight="3px solid #04C5B9";
ytproAudX.style.position="absolute";
ytproAudX.style.top="-43.25px";
ytproAudX.style.color="#04C5B9";
ytproAudX.style.textAlign="center";
ytproAudX.innerHTML="&#x2715;";
ytproAudX.style.fontSize="20px";
ytproAudPlayerElem.style.position="absolute";
ytproAudPlayerElem.style.top="-20px";
ytproAudPlayerElem.style.left="0";
ytproAudPlayerElem.style.height="80px";
ytproAudPlayerElem.style.width="100%";
ytproAudDivElem.innerHTML+="<style>audio::-webkit-media-controls-panel{background:white;}</style>";
ytproAudPlayerElem.setAttribute("id","ytproaudss");
ytproAudPlayerElem.controls=true;
ytproAudPlayerElem.src=ytproURL;
document.body.appendChild(ytproAudDivElem);
ytproAudDivElem.appendChild(ytproAudPlayerElem);
ytproAudDivElem.appendChild(ytproAudX);
document.getElementsByClassName('video-stream')[0].pause();
ytproAudX.addEventListener("click",function(){this.parentElement.remove();});
/*Listen To the Song*/
ytproAudPlayerElem.onloadeddata = function() {
ytproAudPlayerElem.play();
Android.showToast("Now Playing \n"+ytproTitle);
Android.gohome("ok");
};
/*Watch The Audio Player*/
ytproAudPlayerElem.addEventListener("timeupdate",function(){
if(ytproAudPlayerElem.currentTime==ytproAudPlayerElem.duration){
window.location.href="https://m.youtube.com"+document.getElementsByTagName("lazy-list")[1].children[1].children[0].children[0].getAttribute("href")+"&auds=ab";
}
});
}
else {
alert("AN ERROR OCCURED , PLEASE UPDATE YT PRO");
}
}
setInterval(pkc,1);


/*YT ADS BLOCKER , I know it's Copy Paste*/
window.onload = function(){ 
var outerLayer = document.getElementsByClassName('video-ads ytp-ad-module');
var adPlayerOverlay = document.getElementsByClassName('ytp-ad-player-overlay'); // popup ads in video
var adImageOverlay = document.getElementsByClassName('ytp-ad-image-overlay');
var button = document.getElementsByClassName('ytp-ad-skip-button ytp-button');
var firstAd = document.getElementsByClassName('ytp-ad-text');
document.getElementsByClassName('video-stream')[0].muted=false;
function skipFirstInner(callback) {
if (adPlayerOverlay[0] && adPlayerOverlay.length > 0) {
adPlayerOverlay[0].style.visibility = 'hidden';
}
else if (adImageOverlay[0] && adImageOverlay.length > 0) {
adImageOverlay[0].style.visibility = 'hidden';
}
callback();
}
function clickSkipBtn() {
if(button[0] && button.length > 0) {
button[0].click();
}
}
setInterval(function(){ 
if (outerLayer && outerLayer.length > 0) {
clickSkipBtn();
skipFirstInner(function() {
if((firstAd && firstAd[2] && firstAd[2].innerHTML.includes('Ad')) ||
(firstAd && firstAd[1] && firstAd[1].innerHTML.includes('Ad')) ||
(firstAd && firstAd[0] && firstAd[0].innerHTML.includes('Ad'))) {
clickSkipBtn();
let videos = document.querySelectorAll('video');
for(let i=0; i<videos.length; i++) {
if(videos[i] && videos[i].duration) {
videos[i].currentTime = videos[i].duration;
}
}
}
});
}
}, 1);
if((new URLSearchParams(window.location.search)).get('auds') == "ab"){
ytproAudPlayer();
}

