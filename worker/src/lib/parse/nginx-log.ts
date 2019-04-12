const identifierAndValue = /^(\w*)(.*?)$/;
const capture = '(.+?)';

export class NginxLog {
  private identifiers: string[] = [];

  private schema: RegExp;

  constructor(template: string) {
    const parts = template.split('$');
    const delimiters: string[] = [];

    delimiters.push(parts.shift() as string);

    for (const part of parts) {
      const token = part.match(identifierAndValue) as RegExpMatchArray;
      this.identifiers.push(token[1]);

      const delimiter = this.escapeRegExpLiteral(token[2]);
      delimiters.push(delimiter);
    }

    const regexpString = '^' + delimiters.join(capture) + '$';
    this.schema = new RegExp(regexpString);
  }

  public parseLine(line: string) {
    const values = line.match(this.schema);
    if (!values || values.length - 1 !== this.identifiers.length) {
      return null;
    }

    values.shift();
    const result: { [key: string]: string } = {};

    for (let i = 0; i < values.length; i++) {
      const identifier = this.identifiers[i];
      const value = values[i];
      result[identifier] = value;
    }

    return result;
  }

  private escapeRegExpLiteral(str: string): string {
    return str.replace(/[\\.?*+^$|\-\(\)\{\}\[\]]/g, '\\$&');
  }
}
