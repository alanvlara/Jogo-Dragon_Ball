import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'dojo-ng';

  constructor(private http:HttpClient) {}

  objetoPlayer: any;
  objetosInimigos: any;
  objetoFatores: any;

  fimdejogo:boolean = false;

  //fatores
  heroi : any;
  faseAtual :any;
  fatorCura : any;
  fatorXP : any;
  fatorEvolucao : any;
  fatorCritico : any;
  playerAtacando : any;
  inimigoAtacando : any;
  playerCurando : any;
  inimigoCurando : any;
  inimigoAtual :any;
  urlInimigo : any;

  //jogador
  player: any;
  urlPlayer:any;

  //inimigos
  inimigos : any[] = [];
  ngOnInit() {
    let headers = new HttpHeaders({})
    this.http.get<any>('http://127.0.0.1:8000/jogadores/1', {headers: headers}).subscribe(
      data => {
        this.objetoPlayer = data
    
        this.player = {
          nivel: this.objetoPlayer.nivel,
          vida: this.objetoPlayer.vida,
          vidaMaxima: this.objetoPlayer.vidaMaxima,
          ataqueMaximo: this.objetoPlayer.ataqueMaximo,
          xp: this.objetoPlayer.xp,
          proximoNivel: this.objetoPlayer.proximoNivel,
          chanceCritico: 0.3,
          urlNormal: this.objetoPlayer.urlNormal,
          urlAtacando: this.objetoPlayer.urlAtacando,
          urlCurando: this.objetoPlayer.urlCurando,
          urlApanhando: this.objetoPlayer.urlApanhando,
          urlCritico: '/assets/playerCritico.gif',
        }

        this.urlPlayer = this.player.urlNormal;
      })

      this.http.get<any>('http://127.0.0.1:8000/fatores/1', {headers: headers}).subscribe(
      data => {
        this.objetoFatores = data

        this.heroi = this.objetoFatores.heroi;
        this.faseAtual = this.objetoFatores.faseAtual;
        this.fatorCura = this.objetoFatores.fatorCura;
        this.fatorXP = this.objetoFatores.fatorXP;
        this.fatorEvolucao = this.objetoFatores.fatorEvolucao;
        this.fatorCritico = 3;
        this.playerAtacando = this.objetoFatores.playerAtacando;
        this.inimigoAtacando = this.objetoFatores.inimigoAtacando;
        this.playerCurando = this.objetoFatores.playerCurando;
        this.inimigoCurando = this.objetoFatores.inimigoCurando;
        
      }
    )

    this.http.get<any>('http://127.0.0.1:8000/inimigos', {headers: headers}).subscribe(
      data => {
        console.log(data)
        for(let inimigo=0; inimigo<data.length; inimigo++){
          this.inimigos.push(data[inimigo])
        }
        this.inimigoAtual = this.inimigos[this.faseAtual];
        this.urlInimigo = this.inimigoAtual.urlNormal;

      })
    
  }
  
selecionaFase = (fase:number) => {
  return {
      ...this.inimigos.find(inimigo => inimigo.fase === fase)
  };
};

defineVidaPlayer() {
  let styles = {
    'width': this.player.vida/this.player.vidaMaxima*100 + '%',
  };
  return styles;
}

defineVidaInimigo() {
  let styles = {
    'width': this.inimigoAtual.vida/this.inimigoAtual.vidaMaxima*100 + '%',
  };
  return styles;
}

atacar = () => {
  if(Math.random() < this.player.chanceCritico){
    this.playerAtacando = true;
    this.urlPlayer = this.player.urlCritico;
    let ataqueHeroi = Math.ceil(Math.random() * this.player.ataqueMaximo);
    if (ataqueHeroi < 0.6*this.player.ataqueMaximo){
      ataqueHeroi = Math.ceil(0.6*this.player.ataqueMaximo);
    }
    setTimeout(() => {
      this.inimigoAtual.vida -= this.fatorCritico*ataqueHeroi;
      this.playerAtacando = false;
      this.urlPlayer = this.player.urlNormal;
      if (this.inimigoAtual.vida > 0) {
        this.acaoInimigo();
      } 
      else {
        this.calculaXp(this.inimigoAtual.experiencia);
        this.inimigoAtual = this.inimigos[++this.faseAtual];
        this.urlInimigo = this.inimigoAtual.urlNormal;
      }
    }, 6500);
    return
  }
  else{
    this.playerAtacando = true;
    this.urlPlayer = this.player.urlAtacando;
    let ataqueHeroi = Math.ceil(Math.random() * this.player.ataqueMaximo);
    if (ataqueHeroi < 0.6*this.player.ataqueMaximo){
      ataqueHeroi = Math.ceil(0.6*this.player.ataqueMaximo);
    }

    setTimeout(() => {
      this.inimigoAtual.vida -= ataqueHeroi;
      this.playerAtacando = false;
      this.urlPlayer = this.player.urlNormal;
      if (this.inimigoAtual.vida > 0) {
        this.acaoInimigo();
    } else {
        this.calculaXp(this.inimigoAtual.experiencia);
        if(this.inimigos[this.faseAtual+1]){
          this.inimigoAtual = this.inimigos[++this.faseAtual];
          this.urlInimigo = this.inimigoAtual.urlNormal;
        }
        else{
          this.fimdejogo = true;
        }
        
    }
  }, 1500);
  return
} 
};

calculaXp = (totalXp:number) => {
  this.player.xp += totalXp;
  if (this.player.xp >= this.player.proximoNivel) {
      const diferenca = this.player.xp - this.player.proximoNivel;
      this.player.vidaMaxima = Math.ceil(this.fatorXP * this.player.vidaMaxima);
      this.player.vida = this.player.vidaMaxima;
      this.player.ataqueMaximo = Math.ceil(this.player.ataqueMaximo * this.fatorXP);
      this.player.proximoNivel = Math.ceil(this.player.proximoNivel * this.fatorEvolucao);
      this.player.xp = 0;
      this.player.nivel++;
      this.calculaXp(diferenca);
  }
}

acaoInimigo = () => {
  const acao = Math.ceil(Math.random() * 3) % 3 === 0 ? 'curar' : 'atacar';

  if (acao === 'atacar') {
      this.ataqueInimigo();
  } else {
      this.curaInimigo();
  }

  if (this.player.vida <= 0){
    this.inimigoAtual = this.inimigos[0];
    for (let inimigo in this.inimigos) {
      this.inimigos[inimigo].vida = this.inimigos[inimigo].vidaMaxima;
    }
    this.inimigoAtual.vida = this.inimigoAtual.vidaMaxima;
    this.faseAtual = 0;
    this.player.vida = this.player.vidaMaxima;
  }

};

ataqueInimigo = () => {
  this.inimigoAtacando = true;
  this.urlPlayer = this.player.urlApanhando;
  this.urlInimigo = this.inimigoAtual.urlAtacando;
  let ataque = Math.ceil(Math.random() * this.inimigoAtual.ataqueMaximo);
  this.player.vida -= ataque;

  setTimeout(() => {
    this.inimigoAtacando = false;
    this.urlPlayer = this.player.urlNormal;
    this.urlInimigo = this.inimigoAtual.urlNormal;
}, this.inimigoAtual.tempoAtaque);
};

curaInimigo = () => {
  this.inimigoCurando = true;
  this.urlInimigo = this.inimigoAtual.urlCurando;

  setTimeout(() => {
    this.inimigoCurando = false;
    this.urlInimigo = this.inimigoAtual.urlNormal;
    let cura = Math.floor(this.inimigoAtual.vidaMaxima * this.fatorCura);
    this.inimigoAtual.vida = Math.min(this.inimigoAtual.vidaMaxima, this.inimigoAtual.vida + cura);
  }, this.inimigoAtual.tempoCura);
};

curar = () => {
  this.playerCurando = true;
  this.urlPlayer = this.player.urlCurando;

  setTimeout(() => {
  this.playerCurando = false;
  this.urlPlayer = this.player.urlNormal;
  let cura = Math.floor(this.player.vidaMaxima * this.fatorCura);
  this.player.vida = Math.min(this.player.vidaMaxima, this.player.vida + cura);
  this.acaoInimigo();
}, 1920);
  
};

//   imprimeCara(){console.log(this.inimigos)
//     console.log(this.inimigos[this.faseAtual])
//     console.log(this.inimigoAtual)
//     console.log(this.faseAtual)
// }

}