/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SentencePair {
  id: string;
  spanish: string;
  armenian: string;
  speaker?: 'A' | 'B' | 'narrator';
  commentary?: string;
}

export interface TextTopic {
  id: string;
  titleArm: string;
  titleEsp: string;
  descriptionArm: string;
  descriptionEsp: string;
  sections: {
    id: string;
    titleArm?: string;
    titleEsp?: string;
    sentences: SentencePair[];
  }[];
}

export interface VocabularyWord {
  id: string;
  spanish: string;
  armenian: string;
  category: string;
  exampleEsp?: string;
  exampleArm?: string;
}

export interface DialogueFillIn {
  id: string;
  sentenceWithBlank: string; // e.g., "Parece que hoy está _____."
  blankValue: string; // e.g., "nublado"
  options: string[]; // Options for fill-in-the-blank
  dialogueContext: string; // Brief Armenian or Spanish context
  armenianTranslation: string;
}

export interface ComprehensionStatement {
  id: string;
  statement: string; // Spanish, e.g., "En Madrid en invierno nieva mucho."
  armenianSentence: string; // Selected Armenian translation reference
  isCorrect: boolean;
  explanationArm: string; // e.g., "Մադրիդում երբեք ձյուն չի գալիս, միայն քամի է լինում:"
}

export type ActiveTab = 'reader' | 'games';

export type GameId = 'match' | 'build' | 'flash' | 'vocab' | 'cloze' | 'truefalse';

export interface GameInfo {
  id: GameId;
  titleArm: string;
  titleEsp: string;
  descriptionArm: string;
  descriptionEsp: string;
  iconName: string;
}
