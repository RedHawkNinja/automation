import { test } from "@playwright/test";
import { LoginPage } from "../page-objects/loginPage";
import { TodoPage } from "../page-objects/todoPage";
import * as inputData from "../test-data/inputData.json";
import * as userData from "../test-data/userData.json";

let todoPage: TodoPage;
let loginPage: LoginPage;

test.beforeEach(async ({ baseURL, page }) => {
  todoPage = new TodoPage(page);
  loginPage = new LoginPage(page);
  await page.goto(`${baseURL}`);
  await loginPage.login(userData.loginUser.email, userData.loginUser.password);
});

test.describe("Todo test case", () => {
  test("TC_01: Validate that the user can add todo items and the items appear in the list.", async () => {
    await todoPage.addTodoItem(inputData.todoItems.buySomeCheese);
    await todoPage.verifyTodoItem([inputData.todoItems.buySomeCheese]);
    await todoPage.addTodoItem(inputData.todoItems.feedTheCat);
    await todoPage.verifyTodoItem([
      inputData.todoItems.buySomeCheese,
      inputData.todoItems.feedTheCat,
    ]);
  });

  test("TC_02: Validate that the user can mark todo items as completed", async () => {
    await todoPage.addTodoItem(inputData.todoItems.buySomeCheese);
    await todoPage.markTodoItemComplete();
    await todoPage.verifyTodoItemCompleted();
  });

  test("TC_03: Validate that the user can delete todo items", async () => {
    await todoPage.addTodoItem(inputData.todoItems.buySomeCheese);
    await todoPage.deleteTodoItem(inputData.todoItems.buySomeCheese);
    await todoPage.verifyTodoItemNotPresent([
      inputData.todoItems.buySomeCheese,
    ]);
    await todoPage.verifyTodoItem([]);
  });

  test("TC_04: Validate the filters available for todo items", async () => {
    await todoPage.verifyTodoFilter(false);
    await todoPage.addTodoItem(inputData.todoItems.buySomeCheese);
    await todoPage.verifyTodoFilter(true);
  });
});
