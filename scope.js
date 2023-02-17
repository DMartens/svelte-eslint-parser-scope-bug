const assert = require('node:assert');
const { parseForESLint } = require('svelte-eslint-parser/lib/parser/index.js');
const { getScopeFromNode } = require('svelte-eslint-parser/lib/scope/index.js');

const testFile = `<script>
import imported from "mod";
const local = true;
</script>
`

const { ast, scopeManager } = parseForESLint(testFile, { parserOptions: { sourceType: 'module' } });
const [script] = ast.body;
const [importDeclaration, variableDeclaration] = script.body;

assert.strictEqual(getScopeFromNode(scopeManager, importDeclaration).type, 'module');
assert.strictEqual(getScopeFromNode(scopeManager, variableDeclaration).type, 'module');
