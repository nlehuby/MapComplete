import {Basemap} from "../Leaflet/Basemap";
import $ from "jquery"
import {State} from "../../State";
export class Geocoding {

    private static readonly host = "https://nominatim.openstreetmap.org/search?";

    static Search(query: string,
                  handleResult: ((places: { display_name: string, lat: number, lon: number, boundingbox: number[] }[]) => void),
                  onFail: (() => void)) {
        const b = State.state.bm.map.getBounds();
        console.log(b);
        $.getJSON(
            Geocoding.host + "format=json&limit=1&viewbox=" + 
            `${b.getEast()},${b.getNorth()},${b.getWest()},${b.getSouth()}`+
            "&accept-language=nl&q=" + query,
            function (data) {
                handleResult(data);
            }).fail(() => {
            onFail();
        });
    }


}
