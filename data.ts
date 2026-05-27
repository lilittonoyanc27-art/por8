/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TextTopic, VocabularyWord, DialogueFillIn, ComprehensionStatement, GameInfo } from './types';

export const TEXT_TOPICS: TextTopic[] = [
  {
    id: 'weather-text',
    titleEsp: '1. El Tiempo (Texto)',
    titleArm: '1. Եղանակ (Տեքստ)',
    descriptionEsp: 'Traducción de frases sobre el clima y las estaciones en España.',
    descriptionArm: 'Եղանակի և Իսպանիայի տարվա եղանակների մասին նախադասությունների թարգմանություն։',
    sections: [
      {
        id: 'weather-a',
        titleEsp: 'Sección A',
        titleArm: 'Մաս Ա',
        sentences: [
          {
            id: 'w1',
            spanish: 'Parece que hoy está nublado.',
            armenian: 'Կարծես թե այսօր ամպամած է։'
          },
          {
            id: 'w2',
            spanish: 'Hace mal tiempo.',
            armenian: 'Վատ եղանակ է։'
          },
          {
            id: 'w3',
            spanish: 'Seguro que va a llover.',
            armenian: 'Հաստատ անձրև է գալու։'
          },
          {
            id: 'w4',
            spanish: 'Además, hay niebla.',
            armenian: 'Բացի այդ, մառախուղ կա։'
          },
          {
            id: 'w5',
            spanish: 'El otoño en Barcelona es muy bonito.',
            armenian: 'Աշունը Բարսելոնայում շատ գեղեցիկ է։'
          },
          {
            id: 'w6',
            spanish: 'En Sevilla hace mucho calor en verano.',
            armenian: 'Սևիլիայում ամռանը շատ շոգ է։'
          },
          {
            id: 'w7',
            spanish: 'En invierno vamos a esquiar a Sierra Nevada.',
            armenian: 'Ձմռանը մենք գնում ենք դահուկ քշելու Սիերա Նևադա։'
          },
          {
            id: 'w8',
            spanish: 'En primavera aquí hace mucho viento.',
            armenian: 'Գարնանը այստեղ շատ քամի է լինում։'
          },
          {
            id: 'w9',
            spanish: 'El invierno es mi estación favorita.',
            armenian: 'Ձմեռը իմ սիրելի տարվա եղանակն է։'
          },
          {
            id: 'w10',
            spanish: 'No me gusta el sol.',
            armenian: 'Ես արև չեմ սիրում։'
          },
          {
            id: 'w11',
            spanish: 'Me gusta cuando nieva o cuando está nublado.',
            armenian: 'Ինձ դուր է գալիս, երբ ձյուն է գալիս կամ երբ ամպամած է։'
          },
          {
            id: 'w12',
            spanish: 'En otoño aquí hace muy buen tiempo.',
            armenian: 'Աշնանը այստեղ շատ լավ եղանակ է։'
          },
          {
            id: 'w13',
            spanish: 'En Madrid en julio hace un calor tremendo.',
            armenian: 'Մադրիդում հուլիսին ահավոր շոգ է լինում։'
          },
          {
            id: 'w14',
            spanish: 'No llueve nunca.',
            armenian: 'Երբեք անձրև չի գալիս։'
          },
          {
            id: 'w15',
            spanish: '¿Te gusta cuando hace frío?',
            armenian: 'Քեզ դուր գալի՞ս է, երբ ցուրտ է լինում։'
          },
          {
            id: 'w16',
            spanish: 'Sí, me gusta bastante el frío.',
            armenian: 'Այո, ինձ բավականին դուր է գալիս ցուրտը։'
          },
          {
            id: 'w17',
            spanish: 'Galicia es preciosa.',
            armenian: 'Գալիսիան հրաշալի է։'
          },
          {
            id: 'w18',
            spanish: 'El invierno en Galicia es muy suave.',
            armenian: 'Ձմեռը Գալիսիայում շատ մեղմ է։'
          },
          {
            id: 'w19',
            spanish: 'Pero llueve mucho.',
            armenian: 'Բայց շատ անձրև է գալիս։'
          }
        ]
      }
    ]
  },
  {
    id: 'dialogues',
    titleEsp: '2. El Tiempo (Diálogos)',
    titleArm: '2. Երկխոսություններ',
    descriptionEsp: 'Diálogos cortos interactivos sobre el clima para aprender y practicar.',
    descriptionArm: 'Կարճ ինտերակտիվ երկխոսություններ եղանակի թեմայով՝ սովորելու և վարժվելու համար։',
    sections: [
      {
        id: 'dialogue-a',
        titleEsp: 'Diálogo a',
        titleArm: 'Երկխոսություն ա',
        sentences: [
          {
            id: 'da1',
            spanish: '— ¡Uf! ¡Qué calor!',
            armenian: '— Ու՜ֆ։ Ինչ շոգ է։',
            speaker: 'A'
          },
          {
            id: 'da2',
            spanish: '— ¡Claro! Estamos en verano.',
            armenian: '— Իհարկե։ Մենք ամռանն ենք։',
            speaker: 'B'
          },
          {
            id: 'da3',
            spanish: '— No estoy acostumbrado a tanto calor. Vengo de un país frío.',
            armenian: '— Ես սովոր չեմ այսքան շոգին։ Ես գալիս եմ սառը երկրից։',
            speaker: 'A'
          },
          {
            id: 'da4',
            spanish: '— ¿Por qué no vas a Galicia o Asturias entonces? En Galicia siempre llueve.',
            armenian: '— Այդ դեպքում ինչո՞ւ չես գնում Գալիսիա կամ Աստուրիա։ Գալիսիայում միշտ անձրև է գալիս։',
            speaker: 'B'
          },
          {
            id: 'da5',
            spanish: '— Porque me gusta el sol. No puedo vivir sin sol.',
            armenian: '— Որովհետև ինձ արևն է դուր գալիս։ Ես չեմ կարող ապրել առանց արևի։',
            speaker: 'A'
          }
        ]
      },
      {
        id: 'dialogue-b',
        titleEsp: 'Diálogo b',
        titleArm: 'Երկխոսություն բ',
        sentences: [
          {
            id: 'db1',
            spanish: '— Quiero pasar las vacaciones en el norte de España.',
            armenian: '— Ես ուզում եմ արձակուրդն անցկացնել Իսպանիայի հյուսիսում։',
            speaker: 'A'
          },
          {
            id: 'db2',
            spanish: '— ¿Por qué en el norte? Allí siempre está nublado y llueve mucho.',
            armenian: '— Ինչո՞ւ հյուսիսում։ Անձրև է գալիս և այլն (Այնտեղ միշտ ամպամած է և շատ անձրև է գալիս)։',
            speaker: 'B'
          },
          {
            id: 'db3',
            spanish: '— Porque en el sur hace demasiado calor. Y el calor no me gusta nada.',
            armenian: '— Որովհետև հարավում չափազանց շոգ է։ Իսկ շոգը ինձ ընդհանրապես դուր չի գալիս։',
            speaker: 'A'
          },
          {
            id: 'db4',
            spanish: '— ¿Por qué no vas a Madrid? En otoño en Madrid hace un tiempo estupendo.',
            armenian: '— Ինչո՞ւ չես գնում Մադրիդ։ Աշնանը Մադրիդում հրաշալի եղանակ է լինում։',
            speaker: 'B'
          },
          {
            id: 'db5',
            spanish: '— Pero, tenéis un clima seco, ¿no?',
            armenian: '— Բայց դուք չոր կլիմա ունեք, չէ՞։',
            speaker: 'A'
          },
          {
            id: 'db6',
            spanish: '— Sí, pero el otoño es bastante suave. Ya no hace tanto calor como en verano, y llueve poco.',
            armenian: '— Այո, բայց աշունը բավականին մեղմ է։ Այլևս այնքան շոգ չէ, որքան ամռանը, և քիչ անձրև է գալիս։',
            speaker: 'B'
          },
          {
            id: 'db7',
            spanish: '— Y en invierno, ¿qué tiempo hace? ¿Nieva?',
            armenian: '— Իսկ ձմռանը ինչպիսի՞ եղանակ է լինում։ Ձյուն գալի՞ս է։',
            speaker: 'A'
          },
          {
            id: 'db8',
            spanish: '— ¡Qué va! En Madrid nunca nieva. Hace mucho viento y, a veces, hace un poco de frío, pero nevar, lo que se dice nevar, no.',
            armenian: '— Իհարկե ոչ։ Մադրիդում երբեք ձյուն չի գալիս։ Շատ քամի է լինում և երբեմն մի քիչ ցուրտ է լինում, բայց ձյուն գալ՝ ինչպես ասում են, ձյուն՝ ոչ։',
            speaker: 'B',
            commentary: 'nevar, lo que se dice nevar, no — ձյուն, որպես այդպիսին, չկա։'
          }
        ]
      }
    ]
  },
  {
    id: 'questions',
    titleEsp: '3. Preguntas para Practicar',
    titleArm: '3. Հարց ու Պատասխան',
    descriptionEsp: 'Preguntas habituales sobre estaciones y respuestas sugeridas.',
    descriptionArm: 'Հարցրեք միմյանց՝ ինչպիսի եղանակ է ձեզ դուր գալիս, որն է ձեր սիրելի տարվա եղանակը։',
    sections: [
      {
        id: 'q-sec',
        sentences: [
          {
            id: 'qp1',
            spanish: '— ¿Cuál es tu estación favorita?',
            armenian: '— Ո՞րն է քո սիրելի եղանակը (տարվա եղանակը)։',
            speaker: 'A'
          },
          {
            id: 'qp2',
            spanish: '— Mi estación favorita es la primavera.',
            armenian: '— Իմ սիրելի եղանակը գարունն է։',
            speaker: 'B'
          },
          {
            id: 'qp3',
            spanish: '— ¿Te gusta el viento?',
            armenian: '— Քեզ դուր գալի՞ս է քամին։',
            speaker: 'A'
          },
          {
            id: 'qp4',
            spanish: '— No, no me gusta cuando hace viento.',
            armenian: '— Ոչ, ինձ դուր չի գալիս, երբ քամի է լինում։',
            speaker: 'B'
          }
        ]
      }
    ]
  },
  {
    id: 'house-text',
    titleEsp: '4. Mi casa (Texto)',
    titleArm: '4. Իմ տունը (Տեքստ)',
    descriptionEsp: 'Descripción detallada de una casa, sus habitaciones y muebles.',
    descriptionArm: 'Տան, սենյակների և կահույքի մանրամասն նկարագրություն։',
    sections: [
      {
        id: 'house-a',
        sentences: [
          {
            id: 'h1',
            spanish: 'Tenemos un piso precioso, aunque muy pequeño.',
            armenian: 'Մենք ունենք հիանալի բնակարան, թեև այն շատ փոքր է։'
          },
          {
            id: 'h2',
            spanish: 'Tiene dos habitaciones y una sala bastante grande.',
            armenian: 'Այն ունի երկու սենյակ և բավականին մեծ հյուրասենյակ։'
          },
          {
            id: 'h3',
            spanish: 'La sala tiene mucha luz.',
            armenian: 'Հյուրասենյակը շատ լուսավոր է։'
          },
          {
            id: 'h4',
            spanish: 'Mi habitación es muy bonita, tengo una cama cómoda, un escritorio, dos sillas y una estantería para los libros.',
            armenian: 'Իմ սենյակը շատ գեղեցիկ է․ ես ունեմ հարմարավետ մահճակալ, գրասեղան, երկու աթոռ և գրքերի համար դարակաշար։'
          },
          {
            id: 'h5',
            spanish: 'También tengo un ordenador bastante moderno.',
            armenian: 'Ես նաև ունեմ բավականին ժամանակակից համակարգիչ։'
          },
          {
            id: 'h6',
            spanish: 'La habitación de mis padres es un poco más grande.',
            armenian: 'Իմ ծնողների սենյակը մի քիչ ավելի մեծ է։'
          },
          {
            id: 'h7',
            spanish: 'Allí tienen un baño y un balcón.',
            armenian: 'Այնտեղ նրանք ունեն լոգասենյակ և պատշգամբ։'
          },
          {
            id: 'h8',
            spanish: 'También tienen un televisor, y un sofá muy antiguo.',
            armenian: 'Նրանք նաև ունեն հեռուստացույց և շատ հին բազմոց։'
          },
          {
            id: 'h9',
            spanish: 'Yo estoy mucho en la cocina, porque me gusta cocinar.',
            armenian: 'Ես շատ ժամանակ եմ անցկացնում խոհանոցում, որովհետև սիրում եմ պատրաստել։'
          },
          {
            id: 'h10',
            spanish: 'Además, tenemos muchas visitas, y siempre tenemos que preparar algo para comer.',
            armenian: 'Բացի այդ, մենք շատ հյուրեր ենք ունենում, և միշտ պետք է ուտելու համար ինչ-որ բան պատրաստենք։'
          }
        ]
      }
    ]
  }
];

export const VOCABULARY: VocabularyWord[] = [
  { id: 'v1', spanish: 'piso', armenian: 'բնակարան', category: 'Տուն (Casa)', exampleEsp: 'Tenemos un piso precioso.', exampleArm: 'Մենք ունենք հիանալի բնակարան։' },
  { id: 'v2', spanish: 'nublado', armenian: 'ամպամած', category: 'Եղանակ (El Tiempo)', exampleEsp: 'Parece que hoy está nublado.', exampleArm: 'Կարծես թե այսօր ամպամած է։' },
  { id: 'v3', spanish: 'niebla', armenian: 'մառախուղ', category: 'Եղանակ (El Tiempo)', exampleEsp: 'Además, hay niebla.', exampleArm: 'Բացի այդ, մառախուղ կա։' },
  { id: 'v4', spanish: 'otoño', armenian: 'աշուն', category: 'Եղանակ (El Tiempo)', exampleEsp: 'El otoño en Barcelona es muy bonito.', exampleArm: 'Աշունը Բարսելոնայում շատ գեղեցիկ է։' },
  { id: 'v5', spanish: 'invierno', armenian: 'ձմեռ', category: 'Եղանակ (El Tiempo)', exampleEsp: 'El invierno es mi estación favorita.', exampleArm: 'Ձմեռը իմ սիրելի տարվա եղանակն է։' },
  { id: 'v6', spanish: 'primavera', armenian: 'գարուն', category: 'Եղանակ (El Tiempo)', exampleEsp: 'En primavera aquí hace mucho viento.', exampleArm: 'Գարնանը այստեղ շատ քամի է լինում։' },
  { id: 'v7', spanish: 'verano', armenian: 'ամառ', category: 'Եղանակ (El Tiempo)', exampleEsp: 'Estamos en verano.', exampleArm: 'Մենք ամռանն ենք։' },
  { id: 'v8', spanish: 'viento', armenian: 'քամի', category: 'Եղանակ (El Tiempo)', exampleEsp: 'Hace mucho viento.', exampleArm: 'Շատ քամի է լինում։' },
  { id: 'v9', spanish: 'calor', armenian: 'շոգ', category: 'Եղանակ (El Tiempo)', exampleEsp: '¡Qué calor!', exampleArm: 'Ինչ շոգ է։' },
  { id: 'v10', spanish: 'frío', armenian: 'ցուրտ', category: 'Եղանակ (El Tiempo)', exampleEsp: 'Me gusta bastante el frío.', exampleArm: 'Ինձ բավականին դուր է գալիս ցուրտը։' },
  { id: 'v11', spanish: 'vacaciones', armenian: 'արձակուրդ', category: 'Տուն / Այլ (General)', exampleEsp: 'Quiero pasar las vacaciones en España.', exampleArm: 'Ես ուզում եմ արձակուրդն անցկացնել Իսպանիայում։' },
  { id: 'v12', spanish: 'habitación', armenian: 'սենյակ', category: 'Տուն (Casa)', exampleEsp: 'Mi habitación es muy bonita.', exampleArm: 'Իմ սենյակը շատ գեղեցիկ է։' },
  { id: 'v13', spanish: 'cama', armenian: 'մահճակալ', category: 'Կահույք (Muebles)', exampleEsp: 'Tengo una cama cómoda.', exampleArm: 'Ես ունեմ հարմարավետ մահճակալ։' },
  { id: 'v14', spanish: 'escritorio', armenian: 'գրասեղան', category: 'Կահույք (Muebles)', exampleEsp: 'Tengo un escritorio moderno.', exampleArm: 'Ես ունեմ ժամանակակից գրասեղան։' },
  { id: 'v15', spanish: 'estantería', armenian: 'դարակաշար', category: 'Կահույք (Muebles)', exampleEsp: 'Tengo una estantería para los libros.', exampleArm: 'Ես ունեմ գրքերի համար դարակաշար։' },
  { id: 'v16', spanish: 'antiguo', armenian: 'հին', category: 'Ածականներ (Adjetivos)', exampleEsp: 'Tienen un sofá muy antiguo.', exampleArm: 'Նրանք ունեն շատ հին բազմոց։' },
  { id: 'v17', spanish: 'cocinar', armenian: 'պատրաստել (ուտելիք)', category: 'Բայեր (Verbos)', exampleEsp: 'Me gusta cocinar mucho.', exampleArm: 'Ես շատ եմ սիրում պատրաստել։' },
  { id: 'v18', spanish: 'visitas', armenian: 'հյուրեր', category: 'Տուն / Այլ (General)', exampleEsp: 'Tenemos muchas visitas.', exampleArm: 'Մենք շատ հյուրեր ենք ունենում։' },
  { id: 'v19', spanish: 'esquiar', armenian: 'դահուկ քշել', category: 'Բայեր (Verbos)', exampleEsp: 'Vamos a esquiar a Sierra Nevada.', exampleArm: 'Գնում ենք դահուկ քշելու Սիերա Նևադա։' },
  { id: 'v20', spanish: 'llueve', armenian: 'անձրևում է', category: 'Եղանակ (El Tiempo)', exampleEsp: 'En Galicia siempre llueve.', exampleArm: 'Գալիսիայում միշտ անձրև է գալիս։' }
];

export const DIALOGUE_CLOZES: DialogueFillIn[] = [
  {
    id: 'dc1',
    sentenceWithBlank: 'Parece que hoy está [blank]. Hace mal tiempo.',
    blankValue: 'nublado',
    options: ['nublado', 'sol', 'viento', 'calor'],
    dialogueContext: 'Կարծես թե այսօր ամպամած է։ Վատ եղանակ է։',
    armenianTranslation: 'Կարծես թե այսօր ամպամած է։ Վատ եղանակ է։'
  },
  {
    id: 'dc2',
    sentenceWithBlank: '— ¡Uf! ¡Qué [blank]! — ¡Claro! Estamos en verano.',
    blankValue: 'calor',
    options: ['calor', 'frío', 'viento', 'lluvia'],
    dialogueContext: '— Ու՜ֆ։ Ինչ շոգ է։ — Իհարկե։ Մենք ամռանն ենք։',
    armenianTranslation: '— Ու՜ֆ։ Ինչ շոգ է։ — Իհարկե։ Մենք ամռանն ենք։'
  },
  {
    id: 'dc3',
    sentenceWithBlank: 'Vengo de un país [blank].',
    blankValue: 'frío',
    options: ['frío', 'caliente', 'bonito', 'seco'],
    dialogueContext: 'Ես գալիս եմ սառը երկրից։',
    armenianTranslation: 'Ես գալիս եմ սառը երկրից։'
  },
  {
    id: 'dc4',
    sentenceWithBlank: 'En Galicia siempre [blank].',
    blankValue: 'llueve',
    options: ['llueve', 'nieva', 'viento', 'sol'],
    dialogueContext: 'Գալիսիայում միշտ անձրև է գալիս։',
    armenianTranslation: 'Գալիսիայում միշտ անձրև է գալիս։'
  },
  {
    id: 'dc5',
    sentenceWithBlank: 'Quiero pasar las [blank] en el norte de España.',
    blankValue: 'vacaciones',
    options: ['vacaciones', 'noches', 'estaciones', 'habitaciones'],
    dialogueContext: 'Ես ուզում եմ արձակուրդն անցկացնել Իսպանիայի հյուսիսում։',
    armenianTranslation: 'Ես ուզում եմ արձակուրդն անցկացնել Իսպանիայի հյուսիսում։'
  },
  {
    id: 'dc6',
    sentenceWithBlank: 'Tenemos un [blank] precioso, aunque muy pequeño.',
    blankValue: 'piso',
    options: ['piso', 'viento', 'sofá', 'clima'],
    dialogueContext: 'Մենք ունենք հիանալի բնակարան, թեև այն շատ փոքր է։',
    armenianTranslation: 'Մենք ունենք հիանալի բնակարան, թեև այն շատ փոքր է։'
  }
];

export const COMPREHENSION_QUIZ: ComprehensionStatement[] = [
  {
    id: 'cs1',
    statement: 'En Madrid en julio nunca llueve.',
    armenianSentence: 'Մադրիդում հուլիսին ահավոր շոգ է լինում։ Երբեք անձրև չի գալիս։',
    isCorrect: true,
    explanationArm: 'Ճիշտ է։ Ըստ տեքստի՝ Մադրիդում հուլիսին երբեք անձրև չի գալիս (No llueve nunca):'
  },
  {
    id: 'cs2',
    statement: 'Al hablante le gusta el sol y no le gusta cuando nieva.',
    armenianSentence: 'Ինձ դուր է գալիս, երբ ձյուն է գալիս կամ երբ ամպամած է։',
    isCorrect: false,
    explanationArm: 'Սխալ է։ Խոսողն ասում է, որ արև չի սիրում (No me gusta el sol) և սիրում է ձյուն կամ ամպամած եղանակ։'
  },
  {
    id: 'cs3',
    statement: 'En Galicia el invierno es muy suave pero llueve mucho.',
    armenianSentence: 'Ձմեռը Գալիսիայում շատ մեղմ է։ Բայց շատ անձրև է գալիս։',
    isCorrect: true,
    explanationArm: 'Ճիշտ է։ Ձմեռը Գալիսիայում մեղմ է (muy suave) և շատ անձրև է գալիս (llueve mucho):'
  },
  {
    id: 'cs4',
    statement: 'En Madrid siempre nieva en invierno.',
    armenianSentence: 'Մադրիդում երբեք ձյուն չի գալիս։',
    isCorrect: false,
    explanationArm: 'Սխալ է։ Տեքստում ասվում է՝ «¡Qué va! En Madrid nunca nieva» (Իհարկե ոչ։ Մադրիդում երբեք ձյուն չի գալիս)։'
  },
  {
    id: 'cs5',
    statement: 'La habitación de los padres es un poco más grande y tiene un baño.',
    armenianSentence: 'Իմ ծնողների սենյակը մի քիչ ավելի մեծ է։ Այնտեղ նրանք ունեն լոգասենյակ և պատշգամբ։',
    isCorrect: true,
    explanationArm: 'Ճիշտ է։ Ծնողների սենյակը ավելի մեծ է, ունի լոգասենյակ (baño) և պատշգամբ (balcón):'
  },
  {
    id: 'cs6',
    statement: 'La sala de estar tiene un televisor y un sofá antiguo.',
    armenianSentence: 'Այնտեղ (ծնողների սենյակում) նրանք ունեն հեռուստացույց և շատ հին բազմոց։',
    isCorrect: false,
    explanationArm: 'Սխալ է։ Հեռուստացույցը (televisor) և հին բազմոցը (sofá antiguo) գտնվում են ծնողների սենյակում, այլ ոչ թե հյուրասենյակում (sala):'
  }
];

export const GAMES: GameInfo[] = [
  {
    id: 'flash',
    titleEsp: 'Tarjetas de Memoria',
    titleArm: 'Հիշողության Քարտեր',
    descriptionEsp: 'Aprende vocabulario clave con tarjetas interactivas y pronunciación.',
    descriptionArm: 'Սովորեք կարևոր բառապաշարը ինտերակտիվ քարտերով և արտասանությամբ։',
    iconName: 'Layers'
  },
  {
    id: 'match',
    titleEsp: 'Parejas de Frases',
    titleArm: 'Գտիր Զույգը',
    descriptionEsp: 'Une las frases en español con su traducción correspondiente en armenio.',
    descriptionArm: 'Միացրեք իսպաներեն նախադասությունները իրենց համապատասխան հայերեն թարգմանությունների հետ։',
    iconName: 'Shuffle'
  },
  {
    id: 'build',
    titleEsp: 'Creador de Frases',
    titleArm: 'Կառուցիր Նախադասությունը',
    descriptionEsp: 'Ordena las palabras mezcladas para formar la frase en español correcta.',
    descriptionArm: 'Դասավորեք խառնված բառերը՝ ճիշտ իսպաներեն նախադասություն կառուցելու համար։',
    iconName: 'Hammer'
  },
  {
    id: 'vocab',
    titleEsp: 'Examen de Vocabulario',
    titleArm: 'Բառապաշարի Թեստ',
    descriptionEsp: 'Prueba tus conocimientos con un cuestionario de opción múltiple.',
    descriptionArm: 'Ստուգեք ձեր գիտելիքները բազմակի ընտրությամբ թեստի միջոցով։',
    iconName: 'GraduationCap'
  },
  {
    id: 'cloze',
    titleEsp: 'Rellenar Huecos',
    titleArm: 'Լրացրու Բացթողումները',
    descriptionEsp: 'Completa los diálogos con la palabra que falta.',
    descriptionArm: 'Լրացրեք երկխոսությունների բաց թողնված բառերը:',
    iconName: 'FileText'
  },
  {
    id: 'truefalse',
    titleEsp: '¿Verdadero o Falso?',
    titleArm: 'Ճի՞շտ է, թե՞ Սխալ',
    descriptionEsp: 'Evalúa tu comprensión lectora de los textos proporcionados.',
    descriptionArm: 'Գնահատեք տեքստերի ձեր ընթերցանության ըմբռնումը։',
    iconName: 'Award'
  }
];
