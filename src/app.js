const positions = [
    {
        id: 1,
        title: '카카오',
        image: "",
        latlng: new kakao.maps.LatLng(33.450705, 126.570677),
        content: "전망뷰 오짐",
        price: "60ETH",
        area: "100m2",
        date: "2020.06.15"
    }
];

let model;

const load = async () => {
    await loadWeb3();
    console.log('test');
}

const loadWeb3 = async () => {
    if (typeof web3 !== "undefined") {
        web3Provider = web3.currentProvider;
        web3 = new Web3(web3.currentProvider);
    } else {
        window.alert('meta mask에 연결해주세요');
    }

    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            await ethereum.enable();
        } catch (e) {

        }
    } else if (window.web3) {
        web3Provider = web3.currentProvider;
        window.web3 = new Web3(web3.currentProvider);
        web3.eth.sendTransaction();
    } else {
        console.log('metamask가 없는것 같아요');
    }
}

const loadAccount = async () => {
    account = web3.eth.accounts[0];
}

const loadContract = async () => {
    const realEstate = await $.getJSON('RealEstate.json');

}

$(() => {
    $(() => {
        $(window).load(() => {
            load();
            createMap();
        })
    })
});

const createMap = () => {
    const mapContainer = document.getElementById('map'), // 지도를 표시할 div
        mapOption = {
            center: new kakao.maps.LatLng(37.56682, 126.97865), // 지도의 중심좌표
            level: 16 // 지도의 확대 레벨
        };

    var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    createMarker(map);
}

const createMarker = (map) => {
    // 마커 이미지의 이미지 주소입니다
    const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

    const imageSize = new kakao.maps.Size(24, 35);

    // 마커 이미지를 생성합니다
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    positions.map(data => {
        const marker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: data.latlng, // 마커를 표시할 위치
            image : markerImage // 마커 이미지
        });

        kakao.maps.event.addListener(marker, 'click', onClickMarker(data));
    });
}

const onClickMarker = (data) => {
    return () => {
        model = data.id;

        $('.map_info').html(`
            <div>
                <h1 class="map_title">
                    ${data.title}
                </h1>
                <div class="map_image">
                    <img src="./image/${data.image}">
                </div>
                <h3 class="map_price">
                    ${data.price}
                </h3>
                <h4 class="map_date">
                    ${data.date}
                </h4>
                <div class="map_area">
                    ${data.area}
                </div>
                <div class="map_content">
                    ${data.content}
                </div>
                <div class="row"><span class="btn">결제하기</span></div>
                
            </div>
        `);
    }
}