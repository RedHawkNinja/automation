import { expect, Locator, Page } from "@playwright/test";
import * as jsonMockData from "../mocked-api/response.json";

export class TodoPage {
  readonly page: Page;
  readonly todoInputBox: Locator;
  readonly todoTitle: Locator;
  readonly todoCheckbox: Locator;
  readonly todoDeleteIcon: Locator;
  readonly todoItem: Locator;
  readonly allFilter: Locator;
  readonly activeFilter: Locator;
  readonly completedFilter: Locator;

  constructor(page: Page) {
    this.page = page;
    this.todoInputBox = page.getByPlaceholder("What needs to be done?");
    this.todoTitle = page.getByTestId("todo-title");
    this.todoItem = page.getByTestId("todo-item");
    this.todoCheckbox = page.getByRole("checkbox", { name: "Toggle Todo" });
    this.todoDeleteIcon = page.getByRole("button", { name: "Delete" });
    this.allFilter = page.getByRole("link", { name: "All" });
    this.activeFilter = page.getByRole("link", { name: "Active" });
    this.completedFilter = page.getByRole("link", { name: "Completed" });
  }

  /* All the action methods used for the test start here. */
  async addTodoItem(item: string) {
    await this.todoInputBox.fill(item);
    await this.todoInputBox.press("Enter");
  }

  async markTodoItemComplete() {
    await this.todoCheckbox.check();
  }

  async markAllTodoItemsComplete() {
    const count = await this.todoCheckbox.count();
    for (let i = 0; i < count; i++) {
      await this.todoCheckbox.nth(i).check();
    }
  }

  async deleteTodoItem(itemText: string) {
    const specificItem = this.todoItem.filter({ hasText: itemText });
    await specificItem.hover();
    await this.todoDeleteIcon.click();
  }

  async deleteAllTodoItems() {
    const count = await this.todoItem.count();
    for (let i = 0; i < count; i++) {
      await this.todoItem.first().hover();
      await this.todoDeleteIcon.click();
    }
  }

  /* All the test assertion methods used for the test start here. */
  async verifyTodoItem(todoItems: string[]) {
    await expect(this.todoTitle).toHaveText(todoItems);
  }

  async verifyTodoItemNotPresent(todoItems: string[]) {
    await expect(this.todoTitle).not.toHaveText(todoItems);
  }

  async verifyTodoItemCompleted() {
    await expect(this.todoItem).toHaveClass("completed");
  }

  async verifyAllTodoItemsCompleted() {
    const count = await this.todoItem.count();
    for (let i = 0; i < count; i++) {
      await expect(this.todoItem.nth(i)).toHaveClass("completed");
    }
  }

  async verifyTodoFilter(visibility: boolean) {
    if (visibility) {
      await expect(this.allFilter).toBeVisible();
      await expect(this.activeFilter).toBeVisible();
      await expect(this.completedFilter).toBeVisible();
    } else {
      await expect(this.allFilter).not.toBeVisible();
      await expect(this.activeFilter).not.toBeVisible();
      await expect(this.completedFilter).not.toBeVisible();
    }
  }

  /* Mocking methods used for the test start here. */
  async mockAPIResponse() {
    await this.page.route(jsonMockData.apiURL, async (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify(jsonMockData.textWith4Words),
      });
    });
  }
}
