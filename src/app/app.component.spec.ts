import * as sinon from 'sinon';
mockImports();

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';

describe('The AppComponent class:', () => {
  let component: AppComponent;
  let cfg: Component;

  beforeAll(() => {
    component = new AppComponent();
    cfg = ((Component as unknown) as sinon.SinonSpy).getCall(0).args[0];
  });

  afterAll(() => {
    component = undefined as any;
    cfg = undefined as any;
  });

  describe('When: configuring the class as a component', () => {
    describe('Then: the component', () => {
      it('should be configured as standalone', () => {
        expect(cfg.standalone).toBe(true);
      });

      it('should import the RouterOutlet', () => {
        expect(cfg.imports).toBeDefined();
        expect(cfg.imports!.includes(RouterOutlet)).toBe(true);
      });
    });

    describe('Then: the component selector', () => {
      const selector = 'kn-root';

      it(`should equal "${selector}"`, () => {
        expect(cfg.selector).toBe(selector);
      });
    });

    describe('Then: the template', () => {
      const template = '<router-outlet />';

      it(`should equal "${template}"`, () => {
        expect(cfg.template).toBe(template);
      });
    });
  });

  describe('When: instantiating the class', () => {
    describe(`Then: the "title" property of the class`, () => {
      const title = 'kin-ocr';

      it(`should equal "${title}"`, () => {
        expect(component.title).toBe(title);
      });
    })
  });
});

//#region helpers

function mockImports(): void {
  mockAngularCore();
  mockAngularRouter();

  function mockAngularCore(): void {
    jest.doMock('@angular/core', () => {
      return {
        Component: sinon.stub()
      };
    }, { virtual: true });
  }
  function mockAngularRouter(): void {
    jest.doMock('@angular/router', () => {
      return {
        RouterOutlet: sinon.stub()
      };
    }, { virtual: true });
  }
}

//#endregion
