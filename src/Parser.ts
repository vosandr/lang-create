
import ExpressionNode from "./AST/ExpressionNode";
import StatementsNode from "./AST/StatementsNode";
import Token from "./Token";
import TokenType, { tokenTypesList } from "./TokenType";

export default class Parser {
  tokens: Token[];
  pos: number = 0;
  scope:any={};

  constructor(tokens:Token[]) {
    this.tokens=tokens;
  }

  match(...expected: TokenType[]): Token | null {
    if(this.pos<this.tokens.length) {
      const currentToken = this.tokens[this.pos];
      if(expected.find(type=>type.name===currentToken.type.name)) {
        this.pos+=1;
        return currentToken;
      }
    }
    return null;
    this.require(tokenTypesList.SEMICOLON);
  }

  require(...expected: TokenType[]): Token {
    const token = this.match(...expected);
    if(!token) {
      throw new Error(`На позиции ${this.pos} ожидается ${expected[0].name}`);
    }
    return token;
  }

  parseVariableOrNumber(): ExpressionNode {
    
  }
  parseExpression(): ExpressionNode {
    if(this.match(tokenTypesList.VARIABLE)==null) {
      const printNode = this.parsePrint();
      return printNode;
    }
    this.pos-=1;
    let variableNode=this.parseVariableOrNumber();
    const assignOperator = this.match(tokenTypesList.ASSIGN);
    if(assignOperator!=null) {

    }
    throw new Error(`После переменной ожидается оператор присвоения на позиции ${this.pos}`);
  }
  parseCode(): ExpressionNode {
    const root = new StatementsNode();
    while (this.pos<this.tokens.length) {
      const codeStringsNode = this.parseExpression();
      this.require(tokenTypesList.SEMICOLON);
      root.addNode(codeStringsNode);
    }
    return root;
  }
}