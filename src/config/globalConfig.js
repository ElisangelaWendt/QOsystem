import {  GDrive } from "@robinbobin/react-native-google-drive-api-wrapper";

export const baseUrl = "https://qossytem.herokuapp.com/";

export const gDriveToken= 'ya29.a0AeTM1idlptV4nMU6-yrpX-nqy1PVJ3jTEkFyu_BuP1VpDCSWUjYyrfXAw8LNAz-ODkntXw2UqS6MSPHCoHJLOPg4VZYgNhLRRGyvPnrhTw1mcIcuYRNadTuT2KK_4V1rSnP3i57xDbxyrZl_RgFAsu85s4ZfPwaCgYKAYoSARESFQHWtWOm7-3ny-qfypwsPFvUBw5ePQ0165';

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