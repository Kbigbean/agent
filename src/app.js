$(() => {
    createMap();
});

const createMap = () => {
    const container = document.getElementById('map');
    const options = {
        center: new kakao.maps.LatLng(36.633535, 127.425882),
        level: 4
    };

    const map = new kakao.maps.Map(container, options);

    const geocoder = new kakao.maps.services.Geocoder();

    const myAddress = [];
}