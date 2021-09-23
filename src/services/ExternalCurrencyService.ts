import axios from 'axios';
import moment, { Moment } from 'moment';


export default new class ExternalCurrencyService {

    private CurrencyMap :{[key: string]: number} = {};
    private lastRefresh?: Moment;

    async refreshMap() {
        // fetch xml with axios
        let result = await axios.get('https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml');
        //get currency from result body with regex
        let regex_USD = RegExp("currency='(?<currency>.*)' rate='(?<rate>.*)'\/>")
        //browse matches and add to map

        let matchTest = regex_USD.exec(result.data);

        if(matchTest) {
            for(let match of matchTest) {
                let stringMatch = regex_USD.exec(match);
                if(stringMatch) {
                    this.CurrencyMap[stringMatch.groups?.currency!] = parseFloat(stringMatch.groups?.rate!);
                    
                }
            }
        }       
     
    }

    public async getConversion(currency: string, baseInEuro: number) {
        if( !this.lastRefresh || this.lastRefresh?.isBefore(moment().subtract(12, 'hours'))) {
            await this.refreshMap();
        }
        if(currency === 'EUR') {
            return baseInEuro;
        }
        if(!Object.keys(this.CurrencyMap).includes(currency)) {
            throw new Error("Currency not found");
        }
        
        return baseInEuro * this.CurrencyMap[currency]!;
    }
}