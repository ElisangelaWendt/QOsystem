import {  GDrive } from "@robinbobin/react-native-google-drive-api-wrapper";

export const baseUrl = "https://qossytem.herokuapp.com/";

export const gDriveToken= 'ya29.a0AeTM1ifFjyZuKKkbV7LO7R6jWiqI4gd1ZB9niLGD1l_JuHweb5F4ZOSd-X-wQ4VsyBRemkWimlkoApd3FfTre2nWPtXON_g9AXSTR8OX6K6COcUgnSaZmq-y8lTe1KZmGCjzpsVcAooNq5BrWpYhaA0flkxNxQaCgYKAX8SARESFQHWtWOm9XDsdmKNYR8WDxAn0I8x2Q0165';

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