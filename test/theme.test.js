'use strict'

const assert = require('chai').assert
const rewire = require('rewire')
const theme = rewire('../lib/theme')
const fixtures = rewire('./fixtures')
const config = theme.__get__('config')
const fs = require('fs')
const js = fs.readFileSync(theme.__get__('jsPath'), config.encoding)
const css = fs.readFileSync(theme.__get__('cssPath'), config.encoding)

suite('Extension Tests', function () {
    test('Integrity check can be patched', function () {
        assert.include([
            js.includes(config.regex.integrity.on),
            js.includes(config.regex.integrity.off)
        ], true, 'Workbench js contains integrity check')
    })
    test('Activity bar can be themed', function () {
        assert.equal(before(), 0, 'Workbench css does not contains the patched color')
        assert.equal(after('_setActivitybar'), 2, 'Workbench css contains 2 elements with the patched color')
    })
    test('Filetree can be themed', function () {
        assert.equal(before(), 0, 'Workbench css does not contains the patched color')
        assert.equal(after('_setFiletree'), 4, 'Workbench css contains 4 elements with the patched color')
    })
    test('Tabs can be themed', function () {
        assert.equal(before(), 0, 'Workbench css does not contains the patched color')
        assert.equal(after('_setTabs'), 8, 'Workbench css contains 8 elements with the patched color')
    })
    test('Status bar can be themed', function () {
        assert.equal(before(), 0, 'Workbench css does not contains the patched color')
        assert.equal(after('_setStatusbar'), 9, 'Workbench css contains 9 elements with the patched color')
    })
    test('Feedback smiley can be patched', function () {
        assert.include([
            css.includes(config.regex.statusbar.smiley.on),
            css.includes(config.regex.statusbar.smiley.off)
        ], true, 'Workbench css contains feedback smiley')
    })
})

function before() {
    return (css.match(new RegExp(fixtures.color, 'g')) || []).length
}

function after(method) {
    const themed = theme.__get__(method)(fixtures.settings, css)
    return (themed.match(new RegExp(fixtures.color, 'g')) || []).length
}
