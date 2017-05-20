import { ShopAngPage } from './app.po';

describe('shop-ang App', () => {
  let page: ShopAngPage;

  beforeEach(() => {
    page = new ShopAngPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
