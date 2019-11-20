// NEWS_IN_VIEW
export const CHANGE_NEWS_IN_VIEW_SUCCESS = 'CHANGE_NEWS_IN_VIEW_SUCCESS';
export const CHANGE_NEWS_IN_VIEW_REQUESTED = 'CHANGE_NEWS_IN_VIEW_REQUESTED';
export const CHANGE_NEWS_IN_VIEW_FAILED = 'CHANGE_NEWS_IN_VIEW_FAILED';

export interface NewsInView {
  id: number | null;
}

export interface NewsInViewState extends NewsInView {
  newsUrl: string;
  title: string;
  content: string;
  isLoading: boolean;
} // eslint-disable-line @typescript-eslint/no-empty-interface

interface ChangeNewsInViewAction {
  type:
    | typeof CHANGE_NEWS_IN_VIEW_SUCCESS
    | typeof CHANGE_NEWS_IN_VIEW_REQUESTED;
  payload: NewsInViewState;
}

export type NewsInViewActionTypes = ChangeNewsInViewAction;

// NEWS_LIST
export const GET_NEWS_LIST_SUCCESS = 'GET_NEWS_LIST_SUCCESS';
export const GET_NEWS_LIST_REQUESTED = 'GET_NEWS_LIST_REQUESTED';
export const GET_NEWS_LIST_FAILED = 'GET_NEWS_LIST_FAILED';

enum NewsType {
  Job = 'job',
  Story = 'story',
  Comment = 'comment',
  Poll = 'poll',
  Pollopt = 'pollopt',
}

export interface NewsMeta {
  id: number;
  deleted: boolean;
  type: NewsType;
  by: string;
  time: number;
  text: string;
  dead: boolean;
  parent: number;
  poll: number;
  kids: number[];
  url: string;
  score: number;
  title: string;
  parts: number[];
  descendants: number;
}

export type NewsListState = {
  list: NewsMeta[];
  isLoading: boolean;
};

interface GetNewsListAction {
  type: typeof GET_NEWS_LIST_REQUESTED | typeof GET_NEWS_LIST_SUCCESS;
  payload: NewsListState;
}

export type NewsListActionTypes = GetNewsListAction;
