export const CHANGE_NEWS_IN_VIEW_SUCCESS = 'CHANGE_NEWS_IN_VIEW_SUCCESS';
export const CHANGE_NEWS_IN_VIEW_REQUESTED = 'CHANGE_NEWS_IN_VIEW_REQUESTED';
export const CHANGE_NEWS_IN_VIEW_FAILED = 'CHANGE_NEWS_IN_VIEW_FAILED';

export interface NewsInView {
  id: number | null;
  storyUrl: string;
}

export interface NewsInViewState extends NewsInView {
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
