import UserController from "../../controller/user.js"
import UserModel from "../../model/user.js"
import resultUser from "../mockUserResult.json"
import querytUser from "../mockuser.json"
import httpMocks from 'node-mocks-http'
import jest from 'jest-mock';


UserModel.findOne = jest.fn();

let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  sres = httpMocks.createResponse();
});

describe("UserController.getUser", () => {
  it("should have a getUser", () => {
    expect(typeof UserController.getUser).toBe("function");
  });
  it("should call UserController.findOne with route parameters", async () => {
    req.params.userName = "sergioxmunoz";
    await UserController.getUser(req, res, next);
    expect(UserModel.findOne).toBeCalledWith(querytUser);
    expect(res.statusCode).toBe(200);
    //expect(res._getJSONData()).toStrictEqual(resultUser);
  });

});

