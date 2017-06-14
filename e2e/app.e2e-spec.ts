import { TimviecPage } from './app.po';

describe('timviec App', () => {
  let page: TimviecPage;

  beforeEach(() => {
    page = new TimviecPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
