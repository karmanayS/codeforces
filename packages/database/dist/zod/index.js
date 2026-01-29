"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/zod/index.ts
var zod_exports = {};
__export(zod_exports, {
  accountSchema: () => accountSchema,
  inputSchema: () => inputSchema,
  optionalQuestionSchema: () => optionalQuestionSchema,
  questionSchema: () => questionSchema,
  relatedAccountSchema: () => relatedAccountSchema,
  relatedQuestionSchema: () => relatedQuestionSchema,
  relatedSessionSchema: () => relatedSessionSchema,
  relatedTestCaseSchema: () => relatedTestCaseSchema2,
  relatedUserSchema: () => relatedUserSchema,
  relatedVisibleTestSchema: () => relatedVisibleTestSchema2,
  sessionSchema: () => sessionSchema,
  signinSchema: () => signinSchema,
  signupSchema: () => signupSchema,
  testCaseSchema: () => testCaseSchema,
  userSchema: () => userSchema,
  verificationSchema: () => verificationSchema,
  visibleTestSchema: () => visibleTestSchema
});
module.exports = __toCommonJS(zod_exports);
var z8 = __toESM(require("zod"));

// src/zod/user.ts
var z = __toESM(require("zod"));
var userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  isAdmin: z.boolean(),
  emailVerified: z.boolean(),
  image: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date()
});
var relatedUserSchema = z.lazy(() => userSchema.extend({
  sessions: relatedSessionSchema.array(),
  accounts: relatedAccountSchema.array(),
  questions: relatedQuestionSchema.array()
}));

// src/zod/session.ts
var z2 = __toESM(require("zod"));
var sessionSchema = z2.object({
  id: z2.string(),
  expiresAt: z2.date(),
  token: z2.string(),
  createdAt: z2.date(),
  updatedAt: z2.date(),
  ipAddress: z2.string().nullish(),
  userAgent: z2.string().nullish(),
  userId: z2.string()
});
var relatedSessionSchema = z2.lazy(() => sessionSchema.extend({
  user: relatedUserSchema
}));

// src/zod/account.ts
var z3 = __toESM(require("zod"));
var accountSchema = z3.object({
  id: z3.string(),
  accountId: z3.string(),
  providerId: z3.string(),
  userId: z3.string(),
  accessToken: z3.string().nullish(),
  refreshToken: z3.string().nullish(),
  idToken: z3.string().nullish(),
  accessTokenExpiresAt: z3.date().nullish(),
  refreshTokenExpiresAt: z3.date().nullish(),
  scope: z3.string().nullish(),
  password: z3.string().nullish(),
  createdAt: z3.date(),
  updatedAt: z3.date()
});
var relatedAccountSchema = z3.lazy(() => accountSchema.extend({
  user: relatedUserSchema
}));

// src/zod/verification.ts
var z4 = __toESM(require("zod"));
var verificationSchema = z4.object({
  id: z4.string(),
  identifier: z4.string(),
  value: z4.string(),
  expiresAt: z4.date(),
  createdAt: z4.date(),
  updatedAt: z4.date()
});

// src/zod/question.ts
var z5 = __toESM(require("zod"));
var questionSchema = z5.object({
  //id: z.string(),
  title: z5.string(),
  description: z5.string(),
  createdAt: z5.date(),
  updatedAt: z5.date(),
  timeLimit: z5.number().int(),
  memoryLimit: z5.number().int(),
  difficulty: z5.enum(["easy", "medium", "hard"]),
  categoryName: z5.string(),
  userId: z5.string()
});
var optionalQuestionSchema = questionSchema.partial();
var relatedQuestionSchema = z5.lazy(() => questionSchema.extend({
  //user: relatedUserSchema,
  testCases: testCaseSchema.array(),
  visibleTests: visibleTestSchema.array()
}));

// src/zod/testcase.ts
var z6 = __toESM(require("zod"));
var testCaseSchema = z6.object({
  //id: z.string(),
  input: z6.string(),
  output: z6.string(),
  questionId: z6.string()
});
var relatedTestCaseSchema2 = z6.lazy(() => testCaseSchema.extend({
  //question: relatedQuestionSchema,
}));

// src/zod/visibletest.ts
var z7 = __toESM(require("zod"));
var visibleTestSchema = z7.object({
  //id: z.string(),
  input: z7.string(),
  output: z7.string(),
  questionId: z7.string()
});
var relatedVisibleTestSchema2 = z7.lazy(() => visibleTestSchema.extend({
  //question: relatedQuestionSchema,
}));

// src/zod/index.ts
var inputSchema = z8.object({
  source_code: z8.string(),
  language_id: z8.number()
});
var signupSchema = z8.object({
  name: z8.string(),
  email: z8.email({ error: "Invalid email" }),
  password: z8.string().min(8, { error: "Password should be atleast 8 charachters long" })
});
var signinSchema = z8.object({
  email: z8.email({ error: "Invalid email" }),
  password: z8.string().min(8, { error: "Password should be atleast 8 charachters long" })
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  accountSchema,
  inputSchema,
  optionalQuestionSchema,
  questionSchema,
  relatedAccountSchema,
  relatedQuestionSchema,
  relatedSessionSchema,
  relatedTestCaseSchema,
  relatedUserSchema,
  relatedVisibleTestSchema,
  sessionSchema,
  signinSchema,
  signupSchema,
  testCaseSchema,
  userSchema,
  verificationSchema,
  visibleTestSchema
});
