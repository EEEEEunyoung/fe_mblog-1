/* global kakao */
import React, { useEffect, useRef, useState } from 'react'
import { BButton } from '../components/styles/FormStyle';
const KakaoMap = () => {
 const kakaomap = useRef();
 const [map, setMap] = useState()
 const [positions, setPositions]= useState([{
    content: '<div>터짐블로그<br /><a href="https://www.iei.or.kr/">웹사이트</a></div>',
    latlng: new kakao.maps.LatLng(37.4984971, 127.032603)
 },
]);
useEffect(()=>{
    const container = document.getElementById('map');
    const options = {
        center: positions[0].latlng,
        level: 4,
    };
    if(!map){
        setMap(new kakao.maps.Map(container, options));

    }else{
        if(positions[1]){//자바 스크립트에서는 0이 아닌건 모두 true
            map.setCenter(positions[1].latlng)
        }
    }
//마커 표시하기 
const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
    
for (let i = 0; i < positions.length; i ++) {
    
    // 마커 이미지의 이미지 크기 입니다
    let imageSize = new kakao.maps.Size(24, 35); 
    
    // 마커 이미지를 생성합니다    
    let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
    
    // 마커를 생성합니다
    const marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커를 표시할 위치
        title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image : markerImage // 마커 이미지 
    });
//마커에 표시할 윈프윈도우 위치
const infowindow = new kakao.maps.InfoWindow({
    content:positions[i].content
});
//마커에  이벤트를 등록하는 함수를 만들고 즉시 호출 되도록 클로저를 만듦
//클로저를 추가하지 않으면, 마커가 여러개 있을 때 마지막 에만 이벤트 적용
(function(marker, infowindow){
 //마커에 mouse over 이벤트 등록 마우스 오버시 인포윈도우를 표시함
 kakao.maps.event.addListener(marker, 'mouseover', function(){
    infowindow.open(map, marker)
 });
 //마커에 mouseout 이벤트 등록 마우스 아웃 시 인포 윈도우를 닫기 처리함
 kakao.maps.event.addListener(marker, 'mouseout', function(){
    infowindow.close()
 });
 kakao.maps.event.addListener(marker, 'click', function(){
    
 });


})(marker, infowindow);
}
},[positions, map]);


    return (
    <>
    <div style={{display:"flex", alignItems:"center", justifyContent:"space-around", flexDirection:"column"}}>
        <div id="map" style={{width:"700px",  height:"500px", marginBottom:"20px", border:"2px solid lightgray", borderRadius:"20px" }} >
        </div>
       <BButton type='button'>현재위치</BButton>
    </div>
    </>
  )
}

export default KakaoMap