import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Player {
  name: string;
  position: string;
  imageUrl: string;
}

@Component({
  selector: 'app-play-beta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './play-beta.component.html',
  styleUrls: ['./play-beta.component.scss']
})
export class PlayBetaComponent {
  players: Player[] = [
    {
      name: "Aaron Rodgers",
      position: "QB",
      imageUrl: "https://e0.365dm.com/23/09/2048x1152/skysports-aaron-rodgers-new-york-jets_6282184.jpg?20230912120237"
    },
    {
      name: "Lamar Jackson",
      position: "QB",
      imageUrl: "https://cdn.britannica.com/30/249830-050-63E9E776/Baltimore-Ravens-quarterback-Lamar-Jackson-2018.jpg"
    },
    {
      name: "Davante Adams",
      position: "WR",
      imageUrl: "https://media.pff.com/2022/04/USATSI_17596959_168392742_lowres.jpg?w=1200&h=675"
    },
    {
      name: "Stefon Diggs",
      position: "WR",
      imageUrl: "https://storage.googleapis.com/static.elsoldemexico.com.mx/elesto/2024/04/Stefon-Diggs-pasaria-a-los-Houston-Texans.jpg"
    },
    {
      name: "Tyreek Hill",
      position: "WR",
      imageUrl: "https://athlonsports.com/.image/t_share/MjEwMjM5NjU4OTkzMzk1Mjc4/usatsi_24369414.jpg"
    },
    {
      name: "Derrick Henry",
      position: "RB",
      imageUrl: "https://d.newsweek.com/en/full/2300198/titans-running-back-derrick-henry.jpg?w=1200&f=dccecb2eec8dcf11a33a40909f2d71a2"
    },
    {
      name: "Christian McCaffrey",
      position: "RB",
      imageUrl: "https://media.gq.com.mx/photos/65c927b74260629bbdf14a2f/1:1/w_2000,h_2000,c_limit/Christian%20McCaffrey.jpg"
    },
    {
      name: "Nick Chubb",
      position: "RB",
      imageUrl: "https://cloudfront-us-east-2.images.arcpublishing.com/reuters/CZKQHYH3JJNSFKMEZ7PWHNU53U.jpg"
    },
    {
      name: "Justin Tucker",
      position: "K",
      imageUrl: "https://static.clubs.nfl.com/image/private/t_person_squared_mobile/f_png/ravens/q2tmxxajs1c2tbomfcyg.png"
    },
    {
      name: "Eagles Defense",
      position: "DEF",
      imageUrl: "https://b.fssta.com/uploads/application/nfl/team-logos/Eagles.png"
    },
    {
      name: "49ers Defense",
      position: "DEF",
      imageUrl: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/sf.png"
    },
    {
      name: "Steelers Defense",
      position: "DEF",
      imageUrl: "https://a.espncdn.com/i/teamlogos/nfl/500/pit.png"
    }
  ];  

  constructor() {
    // Ya no es necesario llamar a loadPlayers
  }
}