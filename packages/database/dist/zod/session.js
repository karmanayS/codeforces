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

// src/zod/session.ts
var session_exports = {};
__export(session_exports, {
  relatedSessionSchema: () => relatedSessionSchema,
  sessionSchema: () => sessionSchema
});
module.exports = __toCommonJS(session_exports);
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

// src/zod/account.ts
var z2 = __toESM(require("zod"));
var accountSchema = z2.object({
  id: z2.string(),
  accountId: z2.string(),
  providerId: z2.string(),
  userId: z2.string(),
  accessToken: z2.string().nullish(),
  refreshToken: z2.string().nullish(),
  idToken: z2.string().nullish(),
  accessTokenExpiresAt: z2.date().nullish(),
  refreshTokenExpiresAt: z2.date().nullish(),
  scope: z2.string().nullish(),
  password: z2.string().nullish(),
  createdAt: z2.date(),
  updatedAt: z2.date()
});
var relatedAccountSchema = z2.lazy(() => accountSchema.extend({
  user: relatedUserSchema
}));

// src/zod/verification.ts
var z3 = __toESM(require("zod"));
var verificationSchema = z3.object({
  id: z3.string(),
  identifier: z3.string(),
  value: z3.string(),
  expiresAt: z3.date(),
  createdAt: z3.date(),
  updatedAt: z3.date()
});

// src/zod/question.ts
var z4 = __toESM(require("zod"));
var questionSchema = z4.object({
  //id: z.string(),
  title: z4.string(),
  description: z4.string(),
  createdAt: z4.date(),
  updatedAt: z4.date(),
  timeLimit: z4.number().int(),
  memoryLimit: z4.number().int(),
  difficulty: z4.enum(["easy", "medium", "hard"]),
  categoryName: z4.string(),
  userId: z4.string()
});
var optionalQuestionSchema = questionSchema.partial();
var relatedQuestionSchema = z4.lazy(() => questionSchema.extend({
  //user: relatedUserSchema,
  testCases: testCaseSchema.array(),
  visibleTests: visibleTestSchema.array()
}));

// src/zod/testcase.ts
var z5 = __toESM(require("zod"));
var testCaseSchema = z5.object({
  //id: z.string(),
  input: z5.string(),
  output: z5.string(),
  questionId: z5.string()
});
var relatedTestCaseSchema2 = z5.lazy(() => testCaseSchema.extend({
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
var relatedVisibleTestSchema2 = z6.lazy(() => visibleTestSchema.extend({
  //question: relatedQuestionSchema,
}));

// src/zod/index.ts
var inputSchema = z7.object({
  source_code: z7.string(),
  language: z7.string()
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

// src/zod/session.ts
var sessionSchema = z8.object({
  id: z8.string(),
  expiresAt: z8.date(),
  token: z8.string(),
  createdAt: z8.date(),
  updatedAt: z8.date(),
  ipAddress: z8.string().nullish(),
  userAgent: z8.string().nullish(),
  userId: z8.string()
});
var relatedSessionSchema = z8.lazy(() => sessionSchema.extend({
  user: relatedUserSchema
}));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  relatedSessionSchema,
  sessionSchema
});
