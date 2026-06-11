package com.projeto_inclure.Projeto.Inclure.services;


import org.xbill.DNS.Lookup;
import org.xbill.DNS.Record;
import org.springframework.stereotype.Service;
import org.xbill.DNS.SimpleResolver;
import org.xbill.DNS.Type;

@Service
public class EmailValidadorService {

    public boolean dominioExists(String userEmail){
        try {
            if (userEmail == null || !userEmail.contains("@")) return false;

            String dominio = userEmail.substring(userEmail.indexOf("@") + 1).trim();

            Lookup lookup = new Lookup(dominio, Type.MX);
            lookup.setResolver(new SimpleResolver("8.8.8.8"));
            Record[] records = lookup.run();

            if (lookup.getResult() == Lookup.SUCCESSFUL && records != null && records.length > 0) return true;

            Lookup lookupA = new Lookup(dominio, Type.A);
            lookupA.setResolver(new SimpleResolver("8.8.8.8"));
            Record[] recordsA = lookupA.run();

            if (lookupA.getResult() == Lookup.SUCCESSFUL && recordsA != null && recordsA.length > 0) return true;

            return false;

        } catch (Exception e){
            return false;
        }
    }
}
