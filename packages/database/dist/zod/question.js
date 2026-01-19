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

// src/zod/question.ts
var question_exports = {};
__export(question_exports, {
  optionalQuestionSchema: () => optionalQuestionSchema,
  questionSchema: () => questionSchema,
  relatedQuestionSchema: () => relatedQuestionSchema
});
module.exports = __toCommonJS(question_exports);
var z8 = __toESM(require("zod"));

// src/zod/index.ts
var z7 = __toESM(require("zod"));

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

// src/zod/testcase.ts
var z5 = __toESM(require("zod"));
var testCaseSchema = z5.object({
  //id: z.string(),
  input: z5.string(),
  output: z5.string(),
  questionId: z5.string()
});
var relatedTestCaseSchema = z5.lazy(() => testCaseSchema.extend({
  //question: relatedQuestionSchema,
}));

// src/zod/visibletest.ts
var z6 = __toESM(require("zod"));
var visibleTestSchema = z6.object({
  //id: z.string(),
  input: z6.string(),
  output: z6.string(),
  questionId: z6.string()
});
var relatedVisibleTestSchema = z6.lazy(() => visibleTestSchema.extend({
  //question: relatedQuestionSchema,
}));

// src/zod/index.ts
var inputSchema = z7.object({
  source_code: z7.string(),
  language_id: z7.number(),
  stdin: z7.string()
});
var signupSchema = z7.object({
  name: z7.string(),
  email: z7.email({ error: "Invalid email" }),
  password: z7.string().min(8, { error: "Password should be atleast 8 charachters long" })
});
var signinSchema = z7.object({
  email: z7.email({ error: "Invalid email" }),
  password: z7.string().min(8, { error: "Password should be atleast 8 charachters long" })
});

// src/zod/question.ts
var questionSchema = z8.object({
  //id: z.string(),
  title: z8.string(),
  description: z8.string(),
  createdAt: z8.date(),
  updatedAt: z8.date(),
  timeLimit: z8.number().int(),
  memoryLimit: z8.number().int(),
  userId: z8.string()
});
var optionalQuestionSchema = questionSchema.partial();
var relatedQuestionSchema = z8.lazy(() => questionSchema.extend({
  //user: relatedUserSchema,
  testCases: testCaseSchema.array(),
  visibleTests: visibleTestSchema.array()
}));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  optionalQuestionSchema,
  questionSchema,
  relatedQuestionSchema
});
