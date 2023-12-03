import {assert, type} from "type-approve"


const ENDOFLINE = /[\r\n\f\v\u2028-\u3000]/u
const WHITESPACE = /[\u0020\u00a0\u2000-\u2009\u200a\u200b]/u
const TABULATOR_LENGTH = 4 // count of whitespaces for one tabulator


const normalizeLinebreaks = function(text) {
    assert(type({string: text}), "Could not normalize end-of-line characters! Value must be a string.")
    return text.replace(ENDOFLINE, "\n")
}


const normalizeTabulators = function(text) {
    assert(type({string: text}), "Could not normalize tabulator characters! Value must be a string.")
    const pattern = new RegExp(`${WHITESPACE.source}{${TABULATOR_LENGTH},${TABULATOR_LENGTH}}`, "gu")
    return text.replace(pattern, "\t")
}


const findCommonSpacesLeader = function(text) {
    assert(type({string: text}), "Could not find common space leader! Value must be a string.")

    let leader

    for(let line of text.split(ENDOFLINE).filter(Boolean)) {
        const sequence = line.match(/^\s+/)?.[0] || ""
        if(sequence.length < 1) {
            leader = "" // reset
            break
        }
        if(!leader || (sequence.length < leader.length && sequence !== leader)) {
            leader = sequence
        }
    }

    return leader
}


const removeLeadingSpaces = function(text) {
    const content = normalizeLinebreaks(text)
    const indentation = findCommonSpacesLeader(content)
    const prefix = new RegExp(`^${indentation}`)

    return content
        .split(ENDOFLINE)
        .map(line => line.replace(prefix, "").trimEnd())
        .join("\n")
}


export const strim = function(text, oneliner = false) {
    assert(type({string: text}), "Could not normalize spaces! Value must be a string.")
    const content = normalizeTabulators(removeLeadingSpaces(text)).trim()
    if(oneliner === true) {
        return content
            .split("\n")
            .filter(Boolean)
            .map(line => line.trim())
            .join(" \\\n")
    }
    return content
}


export default strim
