import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {AngularFireDatabase} from 'angularfire2/database';

/*
  Generated class for the InitServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class InitServiceProvider {
  reviewers = {};
  followers= [
    // {
    //   "mail" : "df_belilet@esi.dz",
    //   "name" : "jamal belilet",
    //   "username" : "jamal",
    //   "key": "-KvHyvlzdUatm6oyQd0N"
    // },
    // {
    //   "mail" : "ribika_goes@gmail.com",
    //   "name" : "Ribika Goes",
    //   "username" : "ribika_goes",
    //   "key": "-KvHyvlzdUatm6oyQd0N"
    // },
    {
      "mail" : "alex_nelson@gmail.com",
      "name" : "Alex Nelson",
      "username" : "alex_nelson",
      "key": "-KvHyvm4U4jOiWaCeGte"
    },
    {
      "mail" : "endurance_greed@gmail.com",
      "name" : "Endurance Greed",
      "username" : "endurance_greed",
      "key": "-KvHyvm4U4jOiWaCeGtf"
    },
    // {
    //   "mail" : "trevor_hacen@gmail.com",
    //   "name" : "Trevor Hasen",
    //   "username" : "trevor_hacen",
    //   "key": "-KvHyvm5UxR1KN9WxFko"
    // },
    // {
    //   "mail" : "hinato_treasure@gmail.com",
    //   "name" : "Hinato Treasure",
    //   "username" : "hinato_treasure",
    //   "key": "-KvHyvm5UxR1KN9WxFkp"
    // },
    // {
    //   "mail" : "solat_strength@gmail.com",
    //   "name" : "Solat Strength",
    //   "username" : "solat_strength",
    //   "key": "-KvHyvm6goTAOj1Gq8iz"
    // },
    {
      "mail" : "df_belilet@gmail.com",
      "name" : "Esolat Scoura",
      "username" : "esolat_scoura",
      "key": "-KvHyvm6goTAOj1Gq8j-"
    }
  ];
  reviews = [
    {
      "bookDetails": {
        "title": "BARCASS CADUNT",
        "author": "Parss Resistere",
        "cover": "barcasscadunt.png"
      },

      "portions": [
        {"_s": "Stigma at the colony was the understanding of resistance, accelerated to a human sonic shower.", "copies": 50, "shares": 48, "loves": 65},
        {"_s": "Pressure at the solar sphere that is when bare pathways experiment.", "copies": 45, "shares": 54, "loves": 95},
        {"_s": "This history has only been questioned by a cloudy ship. ", "copies": 15, "shares": 84, "loves": 65}

      ],
      "reviewers": [
        {
          "key": "-KvHyKSgaHTWKgmKZ-le",
          "name": "Jamal",
          "username": "jamal"
        },
        {
          "key": "-KvHyvlzdUatm6oyQd0N",
          "name": "Ribika Goes",
          "username": "ribika_goes"
        }
      ]

    },
    {
      "bookDetails": {
        "title": "The Profissor",
        "author": "Charlote Bronte",
        "cover": "theprofessor.png"
      },
      "reviewers": [
        {
          "key": "-KvHyvm5UxR1KN9WxFko",
          "name": "Trevor Hasen",
          "username": "trevor_hacen"
        },
        {
          "key": "-KvHyvm4U4jOiWaCeGte",
          "name": "Alex Nelson",
          "username": "alex_nelson"
        }
      ],
      "portions": [
        {"_s": "Chambray Carles Terry Gibson balls plaid wolf. Disrupt fashion axe 90's quinoa +1 Neutra.", "copies": 100, "shares": 85, "loves": 156},
        {"_s": "Irony ethnic ennui McSweeney's, semiotics small batch squid direct trade.", "copies": 85, "shares": 10, "loves": 50},
        {"_s": "Readymade salvia Echo Park scenester. Farm-to-table selvage small batch swag", "copies": 181, "shares": 120, "loves": 215}

      ]
    },
    {
      "bookDetails": {
        "title": "Wisely translate a transformator",
        "author": "Pedantically Teleporter",
        "cover": "Wiselytranslateatransformator.png"
      },
      "reviewers": [
        {
          "key": "-KvHyvm4U4jOiWaCeGtf",
          "name": "Endurance Greed",
          "username": "endurance_greed"
        },
        {
          "key": "-KvHyvm6goTAOj1Gq8iz",
          "name": "Solat Strength",
          "username": "solat_strength"
        }
      ],
      "portions": [
        {"_s": "All cannibals mark undead, swashbuckling seas. Furners are the gibbets of the mighty horror.", "copies": 15, "shares": 95, "loves": 15},
        {"_s": "The scabbard scrapes with yellow fever, haul the pacific ocean before it rises.", "copies": 150, "shares": 51, "loves": 150},
        {"_s": "The sailor views with love, rob the reef until it rises.", "copies": 845, "shares": 541, "loves": 215}

      ]
    },
    {
      "bookDetails": {
        "title": "Desire Seashell",
        "author": "Adobo Sauce",
        "cover": "desireseashell.png"
      },
      "reviewers": [
        {
          "key": "-KvHyvm5UxR1KN9WxFkp",
          "name": "Hinato Treasure",
          "username": "hinato_treasure"
        },
        {
          "key": "-KvHyvm6goTAOj1Gq8j-",
          "name": "Esolat Scoura",
          "username": "esolat_scoura"
        }
      ],
      "portions": [
        {"_s": "Strawberries can be covered with sun-dried bok choy, also try marinateing the chili with joghurt.", "copies": 152, "shares": 145, "loves": 84},
        {"_s": "The shore vandalizes with power, sail the captain's quarters before it waves.", "copies": 650, "shares": 520, "loves": 250},
        {"_s": "The sun blows with treasure, fire the brig until it laughs. ", "copies": 145, "shares": 215, "loves": 352}

      ]
    }
  ];
  reviewer_reviews = {
    "-KvHyKSgaHTWKgmKZ-le": [
      {
        "key": "-KvIQk1vbNV86AhJJSbL",
        "bookDetails": {
          "title": "BARCASS CADUNT",
          "author": "Parss Resistere",
          "cover": "barcasscadunt.png"
        }
      }
    ],
    "-KvHyvlzdUatm6oyQd0N": [
      {
        "key": "-KvIQk1vbNV86AhJJSbL",
        "bookDetails": {
          "title": "BARCASS CADUNT",
          "author": "Parss Resistere",
          "cover": "barcasscadunt.png"
        }
      }
    ],
    "-KvHyvm5UxR1KN9WxFko": [
      {
        "key": "-KvIQk22OfdQjNJaUGNN",
        "bookDetails": {
          "title": "The Profissor",
          "author": "Charlote Bronte",
          "cover": "theprofessor.png"
        }
      }
    ],
    "-KvHyvm4U4jOiWaCeGte": [
      {
        "key": "-KvIQk22OfdQjNJaUGNN",
        "bookDetails": {
          "title": "The Profissor",
          "author": "Charlote Bronte",
          "cover": "theprofessor.png"
        }
      }
    ],
    "-KvHyvm4U4jOiWaCeGtf": [
      {
        "key": "-KvIQk24ARH_ZI5H7dJr",
        "bookDetails": {
          "title": "Wisely translate a transformator",
          "author": "Pedantically Teleporter",
          "cover": "Wiselytranslateatransformator.png"
        }
      }
    ],
    "-KvHyvm6goTAOj1Gq8iz": [
      {
        "key": "-KvIQk24ARH_ZI5H7dJr",
        "bookDetails": {
          "title": "Wisely translate a transformator",
          "author": "Pedantically Teleporter",
          "cover": "Wiselytranslateatransformator.png"
        }
      }
    ],
    "-KvHyvm5UxR1KN9WxFkp": [
      {
        "key": "-KvIQk25Bk5Tn-zZjSD9",
        "bookDetails": {
          "title": "Desire Seashell",
          "author": "Adobo Sauce",
          "cover": "desireseashell.png"
        }
      }
    ],
    "-KvHyvm6goTAOj1Gq8j-": [
      {
        "key": "-KvIQk25Bk5Tn-zZjSD9",
        "bookDetails": {
          "title": "Desire Seashell",
          "author": "Adobo Sauce",
          "cover": "desireseashell.png"
        }
      }
    ]
  };

  constructor(private afDatabase: AngularFireDatabase, public http: Http) {
    console.log('Hello InitServiceProvider Provider');
  }

  initReviewers() {
    // this.http.get('assets/json/jbooks-feb7c-reviewers-export.json').map(response => response.json()).subscribe(
    //   reviewers => this.afDatabase.object('reviewers').set(reviewers)
    // );
    this.initReviewerReviews("-KvHyKSgaHTWKgmKZ-le");
  }

  initFollowing(reviewerKey$) {
    for ( let follower of this.followers) {
      this.afDatabase.list(`reviewer_following/${reviewerKey$}`).push(follower);
    }
  }

  initReviews() {
    for ( let review of this.reviews) {
      this.afDatabase.list(`reviewes`).push(review);
    }
  }

  initReviewerReviews(reviewerKey$) {
    this.afDatabase.object(`reviewer_reviews`).set(this.reviewer_reviews);
  }

}
