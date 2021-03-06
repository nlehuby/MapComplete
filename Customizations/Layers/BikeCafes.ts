import {LayerDefinition} from "../LayerDefinition";
import FixedText from "../Questions/FixedText";
import {ImageCarouselWithUploadConstructor} from "../../UI/Image/ImageCarouselWithUpload";
import Translations from "../../UI/i18n/Translations";
import CafeName from "../Questions/bike/CafeName";
import { Or, And, Tag, anyValueExcept, Regex } from "../../Logic/TagsFilter";
import { PhoneNumberQuestion } from "../Questions/PhoneNumberQuestion";
import Website from "../Questions/Website";
import CafeRepair from "../Questions/bike/CafeRepair";
import CafeDiy from "../Questions/bike/CafeDiy";
import CafePump from "../Questions/bike/CafePump";
import {EmailQuestion} from "../Questions/EmailQuestion";


export default class BikeCafes extends LayerDefinition {
    private readonly to = Translations.t.cyclofix.cafe

    constructor() {
        super("bikecafe")
        this.name = this.to.name
        this.icon = "./assets/bike/cafe.svg"
        this.overpassFilter = new And([
            new Tag("amenity", /^pub|bar|cafe$/),
            new Or([
                new Tag(/^service:bicycle:/, "*"),
                new Tag("pub", "cycling")
            ])
        ]) 
        
        this.presets = [
            {
                title: Translations.t.cyclofix.cafe.title,
                tags :  [
                    new Tag("amenity", "pub"),
                    new Tag("pub", "cycling"),
                ]
            }
        ]
        
        this.maxAllowedOverlapPercentage = 10;

        this.minzoom = 13
        this.style = this.generateStyleFunction()
        this.title = new FixedText(this.to.title)
        this.elementsToShow = [
            new ImageCarouselWithUploadConstructor(),
            new CafeName(),
            new Website("{name}"),
            new PhoneNumberQuestion("{name}"),
            new EmailQuestion("{name}"),
            new CafeRepair(),
            new CafeDiy(),
            new CafePump()
        ]
        this.wayHandling = LayerDefinition.WAYHANDLING_CENTER_AND_WAY
    }

    private generateStyleFunction() {
        const self = this
        return function (properties: any) {
            return {
                color: "#00bb00",
                icon: {
                    iconUrl:  "./assets/bike/cafe.svg",
                    iconSize: [50, 50],
                    iconAnchor: [25,50]
                }
            }
        }
    }
}