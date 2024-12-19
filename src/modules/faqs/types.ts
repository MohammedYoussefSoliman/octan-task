export type FaqType = {
  id: number;
  question: string;
  answer: string;
};

export type RecordType = {
  id: number;
  name: string;
  FAQs: FaqType[];
};

export type RecordsType = RecordType[] | null;
