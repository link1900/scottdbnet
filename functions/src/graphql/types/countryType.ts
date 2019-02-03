import { gql } from '../graphqlTools';
import { createEnum } from '../graphqlSchemaBuilders';

export const countryDefinition = gql`
  enum Country {
    ASCENSION_ISLAND
    ANDORRA
    UNITED_ARAB_EMIRATES
    AFGHANISTAN
    ANTIGUA_AND_BARBUDA
    ANGUILLA
    FRENCH_AFAR_AND_ISSAS
    ALBANIA
    ARMENIA
    NETHERLANDS_ANTILLES
    ANGOLA
    ANTARCTICA
    ARGENTINA
    AMERICAN_SAMOA
    AUSTRIA
    AUSTRALIA
    ARUBA
    ALAND_ISLANDS
    AZERBAIJAN
    BOSNIA_AND_HERZEGOVINA
    BARBADOS
    BANGLADESH
    BELGIUM
    BURKINA_FASO
    BULGARIA
    BAHRAIN
    BURUNDI
    BENIN
    SAINT_BARTHELEMY
    BERMUDA
    BRUNEI_DARUSSALAM
    BOLIVIA_PLURINATIONAL_STATE_OF
    BONAIRE_SAINT_EUSTATIUS_AND_SABA
    BRITISH_ANTARCTIC_TERRITORY
    BRAZIL
    BAHAMAS
    BHUTAN
    BURMA
    BOUVET_ISLAND
    BOTSWANA
    BELARUS
    BYELORUSSIAN_SSR
    BELIZE
    CANADA
    COCOS_KEELING_ISLANDS
    DEMOCRATIC_REPUBLIC_OF_CONGO
    CENTRAL_AFRICAN_REPUBLIC
    REPUBLIC_OF_CONGO
    SWITZERLAND
    COTE_DIVOIRE
    COOK_ISLANDS
    CHILE
    CAMEROON
    CHINA
    COLOMBIA
    CLIPPERTON_ISLAND
    COSTA_RICA
    CZECHOSLOVAKIA
    SERBIA_AND_MONTENEGRO
    CANTON_AND_ENDERBURY_ISLANDS
    CUBA
    CABO_VERDE
    CURACAO
    CHRISTMAS_ISLAND
    CYPRUS
    CZECH_REPUBLIC
    GERMAN_DEMOCRATIC_REPUBLIC
    GERMANY
    DIEGO_GARCIA
    DJIBOUTI
    DENMARK
    DOMINICA
    DOMINICAN_REPUBLIC
    DAHOMEY
    ALGERIA
    CEUTA_MULILLA
    ECUADOR
    ESTONIA
    EGYPT
    WESTERN_SAHARA
    ERITREA
    SPAIN
    ETHIOPIA
    EUROPEAN_UNION
    FINLAND
    FIJI
    FALKLAND_ISLANDS
    MICRONESIA_FEDERATED_STATES_OF
    FAROE_ISLANDS
    FRENCH_SOUTHERN_AND_ANTARCTIC_TERRITORIES
    FRANCE
    FRANCE_METROPOLITAN
    GABON
    GRENADA
    GEORGIA
    GILBERT_AND_ELLICE_ISLANDS
    FRENCH_GUIANA
    GUERNSEY
    GHANA
    GIBRALTAR
    GREENLAND
    GAMBIA
    GUINEA
    GUADELOUPE
    EQUATORIAL_GUINEA
    GREECE
    SOUTH_GEORGIA_AND_THE_SOUTH_SANDWICH_ISLANDS
    GUATEMALA
    GUAM
    GUINEA_BISSAU
    GUYANA
    HONG_KONG
    HEARD_ISLAND_AND_MCDONALD_ISLANDS
    HONDURAS
    CROATIA
    HAITI
    HUNGARY
    UPPER_VOLTA
    CANARY_ISLANDS
    INDONESIA
    IRELAND
    ISRAEL
    ISLE_OF_MAN
    INDIA
    BRITISH_INDIAN_OCEAN_TERRITORY
    IRAQ
    IRAN_ISLAMIC_REPUBLIC_OF
    ICELAND
    ITALY
    JERSEY
    JAMAICA
    JORDAN
    JAPAN
    JOHNSTON_ISLAND
    KENYA
    KYRGYZSTAN
    CAMBODIA
    KIRIBATI
    COMOROS
    SAINT_KITTS_AND_NEVIS
    KOREA_DEMOCRATIC_PEOPLES_REPUBLIC_OF
    KOREA_REPUBLIC_OF
    KUWAIT
    CAYMAN_ISLANDS
    KAZAKHSTAN
    LAO_PEOPLES_DEMOCRATIC_REPUBLIC
    LEBANON
    SAINT_LUCIA
    LIECHTENSTEIN
    SRI_LANKA
    LIBERIA
    LESOTHO
    LITHUANIA
    LUXEMBOURG
    LATVIA
    LIBYA
    MOROCCO
    MONACO
    MOLDOVA
    MONTENEGRO
    SAINT_MARTIN
    MADAGASCAR
    MARSHALL_ISLANDS
    MIDWAY_ISLANDS
    MACEDONIA_THE_FORMER_YUGOSLAV_REPUBLIC_OF
    MALI
    MYANMAR
    MONGOLIA
    MACAO
    NORTHERN_MARIANA_ISLANDS
    MARTINIQUE
    MAURITANIA
    MONTSERRAT
    MALTA
    MAURITIUS
    MALDIVES
    MALAWI
    MEXICO
    MALAYSIA
    MOZAMBIQUE
    NAMIBIA
    NEW_CALEDONIA
    NIGER
    NORFOLK_ISLAND
    NIGERIA
    NEW_HEBRIDES
    NICARAGUA
    NETHERLANDS
    NORWAY
    NEPAL
    DRONNING_MAUD_LAND
    NAURU
    NEUTRAL_ZONE
    NIUE
    NEW_ZEALAND
    OMAN
    PANAMA
    PACIFIC_ISLANDS_TRUST_TERRITORY_OF_THE
    PERU
    FRENCH_POLYNESIA
    PAPUA_NEW_GUINEA
    PHILIPPINES
    PAKISTAN
    POLAND
    SAINT_PIERRE_AND_MIQUELON
    PITCAIRN
    PUERTO_RICO
    PALESTINIAN_TERRITORY_OCCUPIED
    PORTUGAL
    US_MISCELLANEOUS_PACIFIC_ISLANDS
    PALAU
    PARAGUAY
    PANAMA_CANAL_ZONE
    QATAR
    REUNION
    SOUTHERN_RHODESIA
    ROMANIA
    SERBIA
    RUSSIAN_FEDERATION
    RWANDA
    SAUDI_ARABIA
    SOLOMON_ISLANDS
    SEYCHELLES
    SUDAN
    SWEDEN
    SINGAPORE
    SAINT_HELENA_ASCENSION_AND_TRISTAN_DA_CUNHA
    SLOVENIA
    SVALBARD_AND_JAN_MAYEN
    SLOVAKIA
    SIKKIM
    SIERRA_LEONE
    SAN_MARINO
    SENEGAL
    SOMALIA
    SURINAME
    SOUTH_SUDAN
    SAO_TOME_AND_PRINCIPE
    USSR
    EL_SALVADOR
    SINT_MAARTEN
    SYRIAN_ARAB_REPUBLIC
    SWAZILAND
    TRISTAN_DE_CUNHA
    TURKS_AND_CAICOS_ISLANDS
    CHAD
    FRENCH_SOUTHERN_TERRITORIES
    TOGO
    THAILAND
    TAJIKISTAN
    TOKELAU
    TIMOR_LESTE_DEMOCRATIC_REPUBLIC_OF
    TURKMENISTAN
    TUNISIA
    TONGA
    EAST_TIMOR
    TURKEY
    TRINIDAD_AND_TOBAGO
    TUVALU
    TAIWAN
    TANZANIA_UNITED_REPUBLIC_OF
    UKRAINE
    UGANDA
    UNITED_KINGDOM
    UNITED_STATES_MINOR_OUTLYING_ISLANDS
    UNITED_STATES
    URUGUAY
    UZBEKISTAN
    VATICAN_CITY_STATE
    SAINT_VINCENT_AND_THE_GRENADINES
    VIET_NAM_DEMOCRATIC_REPUBLIC_OF
    VENEZUELA_BOLIVARIAN_REPUBLIC_OF
    VIRGIN_ISLANDS_BRITISH
    VIRGIN_ISLANDS_US
    VIET_NAM
    VANUATU
    WALLIS_AND_FUTUNA
    WAKE_ISLAND
    SAMOA
    KOSOVO
    YEMEN_DEMOCRATIC
    YEMEN
    MAYOTTE
    YUGOSLAVIA
    SOUTH_AFRICA
    ZAMBIA
    ZAIRE
    ZIMBABWE
  }
`;

export enum Country {
  ASCENSION_ISLAND = 'AC',
  ANDORRA = 'AD',
  UNITED_ARAB_EMIRATES = 'AE',
  AFGHANISTAN = 'AF',
  ANTIGUA_AND_BARBUDA = 'AG',
  ANGUILLA = 'AI',
  FRENCH_AFAR_AND_ISSAS = 'AI',
  ALBANIA = 'AL',
  ARMENIA = 'AM',
  NETHERLANDS_ANTILLES = 'AN',
  ANGOLA = 'AO',
  ANTARCTICA = 'AQ',
  ARGENTINA = 'AR',
  AMERICAN_SAMOA = 'AS',
  AUSTRIA = 'AT',
  AUSTRALIA = 'AU',
  ARUBA = 'AW',
  ALAND_ISLANDS = 'AX',
  AZERBAIJAN = 'AZ',
  BOSNIA_AND_HERZEGOVINA = 'BA',
  BARBADOS = 'BB',
  BANGLADESH = 'BD',
  BELGIUM = 'BE',
  BURKINA_FASO = 'BF',
  BULGARIA = 'BG',
  BAHRAIN = 'BH',
  BURUNDI = 'BI',
  BENIN = 'BJ',
  SAINT_BARTHELEMY = 'BL',
  BERMUDA = 'BM',
  BRUNEI_DARUSSALAM = 'BN',
  BOLIVIA_PLURINATIONAL_STATE_OF = 'BO',
  BONAIRE_SAINT_EUSTATIUS_AND_SABA = 'BQ',
  BRITISH_ANTARCTIC_TERRITORY = 'BQ',
  BRAZIL = 'BR',
  BAHAMAS = 'BS',
  BHUTAN = 'BT',
  BURMA = 'BU',
  BOUVET_ISLAND = 'BV',
  BOTSWANA = 'BW',
  BELARUS = 'BY',
  BYELORUSSIAN_SSR = 'BY',
  BELIZE = 'BZ',
  CANADA = 'CA',
  COCOS_KEELING_ISLANDS = 'CC',
  DEMOCRATIC_REPUBLIC_OF_CONGO = 'CD',
  CENTRAL_AFRICAN_REPUBLIC = 'CF',
  REPUBLIC_OF_CONGO = 'CG',
  SWITZERLAND = 'CH',
  COTE_DIVOIRE = 'CI',
  COOK_ISLANDS = 'CK',
  CHILE = 'CL',
  CAMEROON = 'CM',
  CHINA = 'CN',
  COLOMBIA = 'CO',
  CLIPPERTON_ISLAND = 'CP',
  COSTA_RICA = 'CR',
  CZECHOSLOVAKIA = 'CS',
  SERBIA_AND_MONTENEGRO = 'CS',
  CANTON_AND_ENDERBURY_ISLANDS = 'CT',
  CUBA = 'CU',
  CABO_VERDE = 'CV',
  CURACAO = 'CW',
  CHRISTMAS_ISLAND = 'CX',
  CYPRUS = 'CY',
  CZECH_REPUBLIC = 'CZ',
  GERMAN_DEMOCRATIC_REPUBLIC = 'DD',
  GERMANY = 'DE',
  DIEGO_GARCIA = 'DG',
  DJIBOUTI = 'DJ',
  DENMARK = 'DK',
  DOMINICA = 'DM',
  DOMINICAN_REPUBLIC = 'DO',
  DAHOMEY = 'DY',
  ALGERIA = 'DZ',
  CEUTA_MULILLA = 'EA',
  ECUADOR = 'EC',
  ESTONIA = 'EE',
  EGYPT = 'EG',
  WESTERN_SAHARA = 'EH',
  ERITREA = 'ER',
  SPAIN = 'ES',
  ETHIOPIA = 'ET',
  EUROPEAN_UNION = 'EU',
  FINLAND = 'FI',
  FIJI = 'FJ',
  FALKLAND_ISLANDS = 'FK',
  MICRONESIA_FEDERATED_STATES_OF = 'FM',
  FAROE_ISLANDS = 'FO',
  FRENCH_SOUTHERN_AND_ANTARCTIC_TERRITORIES = 'FQ',
  FRANCE = 'FR',
  FRANCE_METROPOLITAN = 'FX',
  GABON = 'GA',
  GRENADA = 'GD',
  GEORGIA = 'GE',
  GILBERT_AND_ELLICE_ISLANDS = 'GE',
  FRENCH_GUIANA = 'GF',
  GUERNSEY = 'GG',
  GHANA = 'GH',
  GIBRALTAR = 'GI',
  GREENLAND = 'GL',
  GAMBIA = 'GM',
  GUINEA = 'GN',
  GUADELOUPE = 'GP',
  EQUATORIAL_GUINEA = 'GQ',
  GREECE = 'GR',
  SOUTH_GEORGIA_AND_THE_SOUTH_SANDWICH_ISLANDS = 'GS',
  GUATEMALA = 'GT',
  GUAM = 'GU',
  GUINEA_BISSAU = 'GW',
  GUYANA = 'GY',
  HONG_KONG = 'HK',
  HEARD_ISLAND_AND_MCDONALD_ISLANDS = 'HM',
  HONDURAS = 'HN',
  CROATIA = 'HR',
  HAITI = 'HT',
  HUNGARY = 'HU',
  UPPER_VOLTA = 'HV',
  CANARY_ISLANDS = 'IC',
  INDONESIA = 'ID',
  IRELAND = 'IE',
  ISRAEL = 'IL',
  ISLE_OF_MAN = 'IM',
  INDIA = 'IN',
  BRITISH_INDIAN_OCEAN_TERRITORY = 'IO',
  IRAQ = 'IQ',
  IRAN_ISLAMIC_REPUBLIC_OF = 'IR',
  ICELAND = 'IS',
  ITALY = 'IT',
  JERSEY = 'JE',
  JAMAICA = 'JM',
  JORDAN = 'JO',
  JAPAN = 'JP',
  JOHNSTON_ISLAND = 'JT',
  KENYA = 'KE',
  KYRGYZSTAN = 'KG',
  CAMBODIA = 'KH',
  KIRIBATI = 'KI',
  COMOROS = 'KM',
  SAINT_KITTS_AND_NEVIS = 'KN',
  KOREA_DEMOCRATIC_PEOPLES_REPUBLIC_OF = 'KP',
  KOREA_REPUBLIC_OF = 'KR',
  KUWAIT = 'KW',
  CAYMAN_ISLANDS = 'KY',
  KAZAKHSTAN = 'KZ',
  LAO_PEOPLES_DEMOCRATIC_REPUBLIC = 'LA',
  LEBANON = 'LB',
  SAINT_LUCIA = 'LC',
  LIECHTENSTEIN = 'LI',
  SRI_LANKA = 'LK',
  LIBERIA = 'LR',
  LESOTHO = 'LS',
  LITHUANIA = 'LT',
  LUXEMBOURG = 'LU',
  LATVIA = 'LV',
  LIBYA = 'LY',
  MOROCCO = 'MA',
  MONACO = 'MC',
  MOLDOVA = 'MD',
  MONTENEGRO = 'ME',
  SAINT_MARTIN = 'MF',
  MADAGASCAR = 'MG',
  MARSHALL_ISLANDS = 'MH',
  MIDWAY_ISLANDS = 'MI',
  MACEDONIA_THE_FORMER_YUGOSLAV_REPUBLIC_OF = 'MK',
  MALI = 'ML',
  MYANMAR = 'MM',
  MONGOLIA = 'MN',
  MACAO = 'MO',
  NORTHERN_MARIANA_ISLANDS = 'MP',
  MARTINIQUE = 'MQ',
  MAURITANIA = 'MR',
  MONTSERRAT = 'MS',
  MALTA = 'MT',
  MAURITIUS = 'MU',
  MALDIVES = 'MV',
  MALAWI = 'MW',
  MEXICO = 'MX',
  MALAYSIA = 'MY',
  MOZAMBIQUE = 'MZ',
  NAMIBIA = 'NA',
  NEW_CALEDONIA = 'NC',
  NIGER = 'NE',
  NORFOLK_ISLAND = 'NF',
  NIGERIA = 'NG',
  NEW_HEBRIDES = 'NH',
  NICARAGUA = 'NI',
  NETHERLANDS = 'NL',
  NORWAY = 'NO',
  NEPAL = 'NP',
  DRONNING_MAUD_LAND = 'NQ',
  NAURU = 'NR',
  NEUTRAL_ZONE = 'NT',
  NIUE = 'NU',
  NEW_ZEALAND = 'NZ',
  OMAN = 'OM',
  PANAMA = 'PA',
  PACIFIC_ISLANDS_TRUST_TERRITORY_OF_THE = 'PC',
  PERU = 'PE',
  FRENCH_POLYNESIA = 'PF',
  PAPUA_NEW_GUINEA = 'PG',
  PHILIPPINES = 'PH',
  PAKISTAN = 'PK',
  POLAND = 'PL',
  SAINT_PIERRE_AND_MIQUELON = 'PM',
  PITCAIRN = 'PN',
  PUERTO_RICO = 'PR',
  PALESTINIAN_TERRITORY_OCCUPIED = 'PS',
  PORTUGAL = 'PT',
  US_MISCELLANEOUS_PACIFIC_ISLANDS = 'PU',
  PALAU = 'PW',
  PARAGUAY = 'PY',
  PANAMA_CANAL_ZONE = 'PZ',
  QATAR = 'QA',
  REUNION = 'RE',
  SOUTHERN_RHODESIA = 'RH',
  ROMANIA = 'RO',
  SERBIA = 'RS',
  RUSSIAN_FEDERATION = 'RU',
  RWANDA = 'RW',
  SAUDI_ARABIA = 'SA',
  SOLOMON_ISLANDS = 'SB',
  SEYCHELLES = 'SC',
  SUDAN = 'SD',
  SWEDEN = 'SE',
  SINGAPORE = 'SG',
  SAINT_HELENA_ASCENSION_AND_TRISTAN_DA_CUNHA = 'SH',
  SLOVENIA = 'SI',
  SVALBARD_AND_JAN_MAYEN = 'SJ',
  SLOVAKIA = 'SK',
  SIKKIM = 'SK',
  SIERRA_LEONE = 'SL',
  SAN_MARINO = 'SM',
  SENEGAL = 'SN',
  SOMALIA = 'SO',
  SURINAME = 'SR',
  SOUTH_SUDAN = 'SS',
  SAO_TOME_AND_PRINCIPE = 'ST',
  USSR = 'SU',
  EL_SALVADOR = 'SV',
  SINT_MAARTEN = 'SX',
  SYRIAN_ARAB_REPUBLIC = 'SY',
  SWAZILAND = 'SZ',
  TRISTAN_DE_CUNHA = 'TA',
  TURKS_AND_CAICOS_ISLANDS = 'TC',
  CHAD = 'TD',
  FRENCH_SOUTHERN_TERRITORIES = 'TF',
  TOGO = 'TG',
  THAILAND = 'TH',
  TAJIKISTAN = 'TJ',
  TOKELAU = 'TK',
  TIMOR_LESTE_DEMOCRATIC_REPUBLIC_OF = 'TL',
  TURKMENISTAN = 'TM',
  TUNISIA = 'TN',
  TONGA = 'TO',
  EAST_TIMOR = 'TP',
  TURKEY = 'TR',
  TRINIDAD_AND_TOBAGO = 'TT',
  TUVALU = 'TV',
  TAIWAN = 'TW',
  TANZANIA_UNITED_REPUBLIC_OF = 'TZ',
  UKRAINE = 'UA',
  UGANDA = 'UG',
  UNITED_KINGDOM = 'UK',
  UNITED_STATES_MINOR_OUTLYING_ISLANDS = 'UM',
  UNITED_STATES = 'US',
  URUGUAY = 'UY',
  UZBEKISTAN = 'UZ',
  VATICAN_CITY_STATE = 'VA',
  SAINT_VINCENT_AND_THE_GRENADINES = 'VC',
  VIET_NAM_DEMOCRATIC_REPUBLIC_OF = 'VD',
  VENEZUELA_BOLIVARIAN_REPUBLIC_OF = 'VE',
  VIRGIN_ISLANDS_BRITISH = 'VG',
  VIRGIN_ISLANDS_US = 'VI',
  VIET_NAM = 'VN',
  VANUATU = 'VU',
  WALLIS_AND_FUTUNA = 'WF',
  WAKE_ISLAND = 'WK',
  SAMOA = 'WS',
  KOSOVO = 'XK',
  YEMEN_DEMOCRATIC = 'YD',
  YEMEN = 'YE',
  MAYOTTE = 'YT',
  YUGOSLAVIA = 'YU',
  SOUTH_AFRICA = 'ZA',
  ZAMBIA = 'ZM',
  ZAIRE = 'ZR',
  ZIMBABWE = 'ZW'
}

export const countryResolver = {
  ASCENSION_ISLAND: Country.ASCENSION_ISLAND,
  ANDORRA: Country.ANDORRA,
  UNITED_ARAB_EMIRATES: Country.UNITED_ARAB_EMIRATES,
  AFGHANISTAN: Country.AFGHANISTAN,
  ANTIGUA_AND_BARBUDA: Country.ANTIGUA_AND_BARBUDA,
  ANGUILLA: Country.ANGUILLA,
  FRENCH_AFAR_AND_ISSAS: Country.FRENCH_AFAR_AND_ISSAS,
  ALBANIA: Country.ALBANIA,
  ARMENIA: Country.ARMENIA,
  NETHERLANDS_ANTILLES: Country.NETHERLANDS_ANTILLES,
  ANGOLA: Country.ANGOLA,
  ANTARCTICA: Country.ANTARCTICA,
  ARGENTINA: Country.ARGENTINA,
  AMERICAN_SAMOA: Country.AMERICAN_SAMOA,
  AUSTRIA: Country.AUSTRIA,
  AUSTRALIA: Country.AUSTRALIA,
  ARUBA: Country.ARUBA,
  ALAND_ISLANDS: Country.ALAND_ISLANDS,
  AZERBAIJAN: Country.AZERBAIJAN,
  BOSNIA_AND_HERZEGOVINA: Country.BOSNIA_AND_HERZEGOVINA,
  BARBADOS: Country.BARBADOS,
  BANGLADESH: Country.BANGLADESH,
  BELGIUM: Country.BELGIUM,
  BURKINA_FASO: Country.BURKINA_FASO,
  BULGARIA: Country.BULGARIA,
  BAHRAIN: Country.BAHRAIN,
  BURUNDI: Country.BURUNDI,
  BENIN: Country.BENIN,
  SAINT_BARTHELEMY: Country.SAINT_BARTHELEMY,
  BERMUDA: Country.BERMUDA,
  BRUNEI_DARUSSALAM: Country.BRUNEI_DARUSSALAM,
  BOLIVIA_PLURINATIONAL_STATE_OF: Country.BOLIVIA_PLURINATIONAL_STATE_OF,
  BONAIRE_SAINT_EUSTATIUS_AND_SABA: Country.BONAIRE_SAINT_EUSTATIUS_AND_SABA,
  BRITISH_ANTARCTIC_TERRITORY: Country.BRITISH_ANTARCTIC_TERRITORY,
  BRAZIL: Country.BRAZIL,
  BAHAMAS: Country.BAHAMAS,
  BHUTAN: Country.BHUTAN,
  BURMA: Country.BURMA,
  BOUVET_ISLAND: Country.BOUVET_ISLAND,
  BOTSWANA: Country.BOTSWANA,
  BELARUS: Country.BELARUS,
  BYELORUSSIAN_SSR: Country.BYELORUSSIAN_SSR,
  BELIZE: Country.BELIZE,
  CANADA: Country.CANADA,
  COCOS_KEELING_ISLANDS: Country.COCOS_KEELING_ISLANDS,
  DEMOCRATIC_REPUBLIC_OF_CONGO: Country.DEMOCRATIC_REPUBLIC_OF_CONGO,
  CENTRAL_AFRICAN_REPUBLIC: Country.CENTRAL_AFRICAN_REPUBLIC,
  REPUBLIC_OF_CONGO: Country.REPUBLIC_OF_CONGO,
  SWITZERLAND: Country.SWITZERLAND,
  COTE_DIVOIRE: Country.COTE_DIVOIRE,
  COOK_ISLANDS: Country.COOK_ISLANDS,
  CHILE: Country.CHILE,
  CAMEROON: Country.CAMEROON,
  CHINA: Country.CHINA,
  COLOMBIA: Country.COLOMBIA,
  CLIPPERTON_ISLAND: Country.CLIPPERTON_ISLAND,
  COSTA_RICA: Country.COSTA_RICA,
  CZECHOSLOVAKIA: Country.CZECHOSLOVAKIA,
  SERBIA_AND_MONTENEGRO: Country.SERBIA_AND_MONTENEGRO,
  CANTON_AND_ENDERBURY_ISLANDS: Country.CANTON_AND_ENDERBURY_ISLANDS,
  CUBA: Country.CUBA,
  CABO_VERDE: Country.CABO_VERDE,
  CURACAO: Country.CURACAO,
  CHRISTMAS_ISLAND: Country.CHRISTMAS_ISLAND,
  CYPRUS: Country.CYPRUS,
  CZECH_REPUBLIC: Country.CZECH_REPUBLIC,
  GERMAN_DEMOCRATIC_REPUBLIC: Country.GERMAN_DEMOCRATIC_REPUBLIC,
  GERMANY: Country.GERMANY,
  DIEGO_GARCIA: Country.DIEGO_GARCIA,
  DJIBOUTI: Country.DJIBOUTI,
  DENMARK: Country.DENMARK,
  DOMINICA: Country.DOMINICA,
  DOMINICAN_REPUBLIC: Country.DOMINICAN_REPUBLIC,
  DAHOMEY: Country.DAHOMEY,
  ALGERIA: Country.ALGERIA,
  CEUTA_MULILLA: Country.CEUTA_MULILLA,
  ECUADOR: Country.ECUADOR,
  ESTONIA: Country.ESTONIA,
  EGYPT: Country.EGYPT,
  WESTERN_SAHARA: Country.WESTERN_SAHARA,
  ERITREA: Country.ERITREA,
  SPAIN: Country.SPAIN,
  ETHIOPIA: Country.ETHIOPIA,
  EUROPEAN_UNION: Country.EUROPEAN_UNION,
  FINLAND: Country.FINLAND,
  FIJI: Country.FIJI,
  FALKLAND_ISLANDS: Country.FALKLAND_ISLANDS,
  MICRONESIA_FEDERATED_STATES_OF: Country.MICRONESIA_FEDERATED_STATES_OF,
  FAROE_ISLANDS: Country.FAROE_ISLANDS,
  FRENCH_SOUTHERN_AND_ANTARCTIC_TERRITORIES: Country.FRENCH_SOUTHERN_AND_ANTARCTIC_TERRITORIES,
  FRANCE: Country.FRANCE,
  FRANCE_METROPOLITAN: Country.FRANCE_METROPOLITAN,
  GABON: Country.GABON,
  GRENADA: Country.GRENADA,
  GEORGIA: Country.GEORGIA,
  GILBERT_AND_ELLICE_ISLANDS: Country.GILBERT_AND_ELLICE_ISLANDS,
  FRENCH_GUIANA: Country.FRENCH_GUIANA,
  GUERNSEY: Country.GUERNSEY,
  GHANA: Country.GHANA,
  GIBRALTAR: Country.GIBRALTAR,
  GREENLAND: Country.GREENLAND,
  GAMBIA: Country.GAMBIA,
  GUINEA: Country.GUINEA,
  GUADELOUPE: Country.GUADELOUPE,
  EQUATORIAL_GUINEA: Country.EQUATORIAL_GUINEA,
  GREECE: Country.GREECE,
  SOUTH_GEORGIA_AND_THE_SOUTH_SANDWICH_ISLANDS: Country.SOUTH_GEORGIA_AND_THE_SOUTH_SANDWICH_ISLANDS,
  GUATEMALA: Country.GUATEMALA,
  GUAM: Country.GUAM,
  GUINEA_BISSAU: Country.GUINEA_BISSAU,
  GUYANA: Country.GUYANA,
  HONG_KONG: Country.HONG_KONG,
  HEARD_ISLAND_AND_MCDONALD_ISLANDS: Country.HEARD_ISLAND_AND_MCDONALD_ISLANDS,
  HONDURAS: Country.HONDURAS,
  CROATIA: Country.CROATIA,
  HAITI: Country.HAITI,
  HUNGARY: Country.HUNGARY,
  UPPER_VOLTA: Country.UPPER_VOLTA,
  CANARY_ISLANDS: Country.CANARY_ISLANDS,
  INDONESIA: Country.INDONESIA,
  IRELAND: Country.IRELAND,
  ISRAEL: Country.ISRAEL,
  ISLE_OF_MAN: Country.ISLE_OF_MAN,
  INDIA: Country.INDIA,
  BRITISH_INDIAN_OCEAN_TERRITORY: Country.BRITISH_INDIAN_OCEAN_TERRITORY,
  IRAQ: Country.IRAQ,
  IRAN_ISLAMIC_REPUBLIC_OF: Country.IRAN_ISLAMIC_REPUBLIC_OF,
  ICELAND: Country.ICELAND,
  ITALY: Country.ITALY,
  JERSEY: Country.JERSEY,
  JAMAICA: Country.JAMAICA,
  JORDAN: Country.JORDAN,
  JAPAN: Country.JAPAN,
  JOHNSTON_ISLAND: Country.JOHNSTON_ISLAND,
  KENYA: Country.KENYA,
  KYRGYZSTAN: Country.KYRGYZSTAN,
  CAMBODIA: Country.CAMBODIA,
  KIRIBATI: Country.KIRIBATI,
  COMOROS: Country.COMOROS,
  SAINT_KITTS_AND_NEVIS: Country.SAINT_KITTS_AND_NEVIS,
  KOREA_DEMOCRATIC_PEOPLES_REPUBLIC_OF: Country.KOREA_DEMOCRATIC_PEOPLES_REPUBLIC_OF,
  KOREA_REPUBLIC_OF: Country.KOREA_REPUBLIC_OF,
  KUWAIT: Country.KUWAIT,
  CAYMAN_ISLANDS: Country.CAYMAN_ISLANDS,
  KAZAKHSTAN: Country.KAZAKHSTAN,
  LAO_PEOPLES_DEMOCRATIC_REPUBLIC: Country.LAO_PEOPLES_DEMOCRATIC_REPUBLIC,
  LEBANON: Country.LEBANON,
  SAINT_LUCIA: Country.SAINT_LUCIA,
  LIECHTENSTEIN: Country.LIECHTENSTEIN,
  SRI_LANKA: Country.SRI_LANKA,
  LIBERIA: Country.LIBERIA,
  LESOTHO: Country.LESOTHO,
  LITHUANIA: Country.LITHUANIA,
  LUXEMBOURG: Country.LUXEMBOURG,
  LATVIA: Country.LATVIA,
  LIBYA: Country.LIBYA,
  MOROCCO: Country.MOROCCO,
  MONACO: Country.MONACO,
  MOLDOVA: Country.MOLDOVA,
  MONTENEGRO: Country.MONTENEGRO,
  SAINT_MARTIN: Country.SAINT_MARTIN,
  MADAGASCAR: Country.MADAGASCAR,
  MARSHALL_ISLANDS: Country.MARSHALL_ISLANDS,
  MIDWAY_ISLANDS: Country.MIDWAY_ISLANDS,
  MACEDONIA_THE_FORMER_YUGOSLAV_REPUBLIC_OF: Country.MACEDONIA_THE_FORMER_YUGOSLAV_REPUBLIC_OF,
  MALI: Country.MALI,
  MYANMAR: Country.MYANMAR,
  MONGOLIA: Country.MONGOLIA,
  MACAO: Country.MACAO,
  NORTHERN_MARIANA_ISLANDS: Country.NORTHERN_MARIANA_ISLANDS,
  MARTINIQUE: Country.MARTINIQUE,
  MAURITANIA: Country.MAURITANIA,
  MONTSERRAT: Country.MONTSERRAT,
  MALTA: Country.MALTA,
  MAURITIUS: Country.MAURITIUS,
  MALDIVES: Country.MALDIVES,
  MALAWI: Country.MALAWI,
  MEXICO: Country.MEXICO,
  MALAYSIA: Country.MALAYSIA,
  MOZAMBIQUE: Country.MOZAMBIQUE,
  NAMIBIA: Country.NAMIBIA,
  NEW_CALEDONIA: Country.NEW_CALEDONIA,
  NIGER: Country.NIGER,
  NORFOLK_ISLAND: Country.NORFOLK_ISLAND,
  NIGERIA: Country.NIGERIA,
  NEW_HEBRIDES: Country.NEW_HEBRIDES,
  NICARAGUA: Country.NICARAGUA,
  NETHERLANDS: Country.NETHERLANDS,
  NORWAY: Country.NORWAY,
  NEPAL: Country.NEPAL,
  DRONNING_MAUD_LAND: Country.DRONNING_MAUD_LAND,
  NAURU: Country.NAURU,
  NEUTRAL_ZONE: Country.NEUTRAL_ZONE,
  NIUE: Country.NIUE,
  NEW_ZEALAND: Country.NEW_ZEALAND,
  OMAN: Country.OMAN,
  PANAMA: Country.PANAMA,
  PACIFIC_ISLANDS_TRUST_TERRITORY_OF_THE: Country.PACIFIC_ISLANDS_TRUST_TERRITORY_OF_THE,
  PERU: Country.PERU,
  FRENCH_POLYNESIA: Country.FRENCH_POLYNESIA,
  PAPUA_NEW_GUINEA: Country.PAPUA_NEW_GUINEA,
  PHILIPPINES: Country.PHILIPPINES,
  PAKISTAN: Country.PAKISTAN,
  POLAND: Country.POLAND,
  SAINT_PIERRE_AND_MIQUELON: Country.SAINT_PIERRE_AND_MIQUELON,
  PITCAIRN: Country.PITCAIRN,
  PUERTO_RICO: Country.PUERTO_RICO,
  PALESTINIAN_TERRITORY_OCCUPIED: Country.PALESTINIAN_TERRITORY_OCCUPIED,
  PORTUGAL: Country.PORTUGAL,
  US_MISCELLANEOUS_PACIFIC_ISLANDS: Country.US_MISCELLANEOUS_PACIFIC_ISLANDS,
  PALAU: Country.PALAU,
  PARAGUAY: Country.PARAGUAY,
  PANAMA_CANAL_ZONE: Country.PANAMA_CANAL_ZONE,
  QATAR: Country.QATAR,
  REUNION: Country.REUNION,
  SOUTHERN_RHODESIA: Country.SOUTHERN_RHODESIA,
  ROMANIA: Country.ROMANIA,
  SERBIA: Country.SERBIA,
  RUSSIAN_FEDERATION: Country.RUSSIAN_FEDERATION,
  RWANDA: Country.RWANDA,
  SAUDI_ARABIA: Country.SAUDI_ARABIA,
  SOLOMON_ISLANDS: Country.SOLOMON_ISLANDS,
  SEYCHELLES: Country.SEYCHELLES,
  SUDAN: Country.SUDAN,
  SWEDEN: Country.SWEDEN,
  SINGAPORE: Country.SINGAPORE,
  SAINT_HELENA_ASCENSION_AND_TRISTAN_DA_CUNHA: Country.SAINT_HELENA_ASCENSION_AND_TRISTAN_DA_CUNHA,
  SLOVENIA: Country.SLOVENIA,
  SVALBARD_AND_JAN_MAYEN: Country.SVALBARD_AND_JAN_MAYEN,
  SLOVAKIA: Country.SLOVAKIA,
  SIKKIM: Country.SIKKIM,
  SIERRA_LEONE: Country.SIERRA_LEONE,
  SAN_MARINO: Country.SAN_MARINO,
  SENEGAL: Country.SENEGAL,
  SOMALIA: Country.SOMALIA,
  SURINAME: Country.SURINAME,
  SOUTH_SUDAN: Country.SOUTH_SUDAN,
  SAO_TOME_AND_PRINCIPE: Country.SAO_TOME_AND_PRINCIPE,
  USSR: Country.USSR,
  EL_SALVADOR: Country.EL_SALVADOR,
  SINT_MAARTEN: Country.SINT_MAARTEN,
  SYRIAN_ARAB_REPUBLIC: Country.SYRIAN_ARAB_REPUBLIC,
  SWAZILAND: Country.SWAZILAND,
  TRISTAN_DE_CUNHA: Country.TRISTAN_DE_CUNHA,
  TURKS_AND_CAICOS_ISLANDS: Country.TURKS_AND_CAICOS_ISLANDS,
  CHAD: Country.CHAD,
  FRENCH_SOUTHERN_TERRITORIES: Country.FRENCH_SOUTHERN_TERRITORIES,
  TOGO: Country.TOGO,
  THAILAND: Country.THAILAND,
  TAJIKISTAN: Country.TAJIKISTAN,
  TOKELAU: Country.TOKELAU,
  TIMOR_LESTE_DEMOCRATIC_REPUBLIC_OF: Country.TIMOR_LESTE_DEMOCRATIC_REPUBLIC_OF,
  TURKMENISTAN: Country.TURKMENISTAN,
  TUNISIA: Country.TUNISIA,
  TONGA: Country.TONGA,
  EAST_TIMOR: Country.EAST_TIMOR,
  TURKEY: Country.TURKEY,
  TRINIDAD_AND_TOBAGO: Country.TRINIDAD_AND_TOBAGO,
  TUVALU: Country.TUVALU,
  TAIWAN: Country.TAIWAN,
  TANZANIA_UNITED_REPUBLIC_OF: Country.TANZANIA_UNITED_REPUBLIC_OF,
  UKRAINE: Country.UKRAINE,
  UGANDA: Country.UGANDA,
  UNITED_KINGDOM: Country.UNITED_KINGDOM,
  UNITED_STATES_MINOR_OUTLYING_ISLANDS: Country.UNITED_STATES_MINOR_OUTLYING_ISLANDS,
  UNITED_STATES: Country.UNITED_STATES,
  URUGUAY: Country.URUGUAY,
  UZBEKISTAN: Country.UZBEKISTAN,
  VATICAN_CITY_STATE: Country.VATICAN_CITY_STATE,
  SAINT_VINCENT_AND_THE_GRENADINES: Country.SAINT_VINCENT_AND_THE_GRENADINES,
  VIET_NAM_DEMOCRATIC_REPUBLIC_OF: Country.VIET_NAM_DEMOCRATIC_REPUBLIC_OF,
  VENEZUELA_BOLIVARIAN_REPUBLIC_OF: Country.VENEZUELA_BOLIVARIAN_REPUBLIC_OF,
  VIRGIN_ISLANDS_BRITISH: Country.VIRGIN_ISLANDS_BRITISH,
  VIRGIN_ISLANDS_US: Country.VIRGIN_ISLANDS_US,
  VIET_NAM: Country.VIET_NAM,
  VANUATU: Country.VANUATU,
  WALLIS_AND_FUTUNA: Country.WALLIS_AND_FUTUNA,
  WAKE_ISLAND: Country.WAKE_ISLAND,
  SAMOA: Country.SAMOA,
  KOSOVO: Country.KOSOVO,
  YEMEN_DEMOCRATIC: Country.YEMEN_DEMOCRATIC,
  YEMEN: Country.YEMEN,
  MAYOTTE: Country.MAYOTTE,
  YUGOSLAVIA: Country.YUGOSLAVIA,
  SOUTH_AFRICA: Country.SOUTH_AFRICA,
  ZAMBIA: Country.ZAMBIA,
  ZAIRE: Country.ZAIRE,
  ZIMBABWE: Country.ZIMBABWE
};

export const countryType = createEnum({
  name: 'Country',
  definition: countryDefinition,
  resolver: countryResolver
});