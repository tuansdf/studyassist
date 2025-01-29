export type NullishKeys<TObject> = {
  [TKey in keyof TObject]?: TObject[TKey] | null | undefined;
};

export type CommonResponse<T = unknown> = NullishKeys<{
  status: string | number;
  message: string;
  data: T;
}>;
