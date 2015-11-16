'use strict';

const PathRunner    = require('path-runner'),
      pathsNI       = require('./paths/nova_iguacu').paths,
      pathsRJ       = require('./paths/rio_de_janeiro'),
      viaturaPMERJ  = require('./viaturas/pmerj'),
      request       = require('request'),
      moment        = require('moment');

const url           = 'http://localhost/viaturas';

function _createViatura(chaveEstrangeira, pos) {
    return [{
        'nome': 'Organização 1',
        'organizacao': '',
        'agencia': 'CONIG',
        'viaturas': [{
            'chaveestrangeira': chaveEstrangeira,
            'nome': 'KXB 6281',
            'status': 1,
            'ultimaAtualizacao': '2015-09-18T14:07:43Z',
            'descricao': '',
            'agencia': 'CONIG',
            'posicao': pos,
            'informacoes': []
        }]
    }];
}

// Nova Iguaçu
let novaIguacu = new PathRunner(pathsNI[0], 100);
let novaIguacu2 = new PathRunner(pathsNI[1], 80);

// Rio de Janeiro
let rioDeJaneiro = new PathRunner(pathsRJ[0], 100);
let rioDeJaneiro2 = new PathRunner(pathsRJ[1], 80);

novaIguacu.start();
novaIguacu2.start();
rioDeJaneiro.start();
rioDeJaneiro2.start();

rioDeJaneiro.on('position', (pos) => {
    let viatura = _createViatura('RJ1', pos);

    request({
        url: url,
        method: 'POST',
        json: true,
        headers: {
            'content-type': 'application/json'
        },
        body: viatura
    });
});

rioDeJaneiro2.on('position', (pos) => {
    let viatura = _createViatura('RJ2', pos);

    request({
        url: url,
        method: 'POST',
        json: true,
        headers: {
            'content-type': 'application/json'
        },
        body: viatura
    });
});

novaIguacu.on('position', (pos) => {
    let viatura = _createViatura('NI1', pos);

    request({
        url: url,
        method: 'POST',
        json: true,
        headers: {
            'content-type': 'application/json'
        },
        body: viatura
    });
});

novaIguacu2.on('position', (pos) => {

    let viatura = _createViatura('NI2', pos);
    request({
        url: url,
        method: 'POST',
        json: true,
        headers: {
            'content-type': 'application/json'
        },
        body: viatura
    }, function(err, data) {
    });
});

