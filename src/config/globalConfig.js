import {  GDrive } from "@robinbobin/react-native-google-drive-api-wrapper";

export const baseUrl = "https://qossytem.herokuapp.com/";

export const gDriveToken= 'ya29.a0AeTM1icD66YeG7p6bTL4b4ZaggMODWp5gKTmU7HLQxs_pL9xZHoQ_NSY72IfAmsnAjitSl2nrRHZE3XCqEGXjgxhWbrpDqhEbYkaQusR4LiCYyYOeFlt5AmQlfDMeAfAle4I_SqbNHhBAM7vCtY6j73f629OWAaCgYKAdASARESFQHWtWOm-UqjTVlZa5mlAvQocB391A0165';

export const gdrive = new GDrive();
  // /* ACESSTOKEN dura 2 horas em Media */
  gdrive.accessToken = gDriveToken
  gdrive.fetchCoercesTypes = true;
  gdrive.fetchRejectsOnHttpErrors = true;
  gdrive.fetchTimeout = 30000;

export function Ordena(data, tipo,campo){

  if (tipo == 'numerico' && campo == 'nome' ){
      return  data.sort(function compare(a, b) {
          if (parseInt(a.nome.replace(/[^0-9]/g,'')) < parseInt(b.nome.replace(/[^0-9]/g,''))) return -1;
          if (parseInt(a.nome.replace(/[^0-9]/g,'')) > parseInt(b.nome.replace(/[^0-9]/g,''))) return 1;
          return 0;
      })
  
  }else if (tipo == 'numerico' && campo == 'id' ){
      return  data.sort(function compare(a, b) {
          if (parseInt(a.id.replace(/[^0-9]/g,'')) < parseInt(b.id.replace(/[^0-9]/g,''))) return -1;
          if (parseInt(a.id.replace(/[^0-9]/g,'')) > parseInt(b.id.replace(/[^0-9]/g,''))) return 1;
          return 0;
      })
  
  }else{
  
      return  data.sort(function compare(a, b) {
          if ((a.nome) < (b.nome)) return -1;
          if ((a.nome) > (b.nome)) return 1;
          return 0;
      })

  }
}