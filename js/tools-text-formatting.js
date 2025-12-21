// ============================================
// TEXT FORMATTING TOOLS
// ============================================
// This file contains JavaScript for all 11 Text Formatting Tools:
// 1. Case Converter
// 2. Remove Extra Spaces
// 3. Remove Line Breaks
// 4. Text Repeater
// 5. Trim Whitespace
// 6. Remove Emojis
// 7. Reverse Text
// 8. Remove Punctuation
// 9. Remove Numbers
// 10. Strip HTML Tags
// 11. Escape/Unescape HTML Entities

// ============================================
// CASE CONVERTER TOOL
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const inputText = document.getElementById('inputText');
    const uppercaseBtn = document.getElementById('uppercaseBtn');
    
    // Only run this code if we're on the Case Converter page
    if (!uppercaseBtn) return;

    const outputText = document.getElementById('outputText');
    const charCount = document.querySelector('.char-count');
    const statusMessage = document.getElementById('statusMessage');
    
    const lowercaseBtn = document.getElementById('lowercaseBtn');
    const titlecaseBtn = document.getElementById('titlecaseBtn');
    const sentencecaseBtn = document.getElementById('sentencecaseBtn');
    const togglecaseBtn = document.getElementById('togglecaseBtn');
    const copyBtn = document.getElementById('copyBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const clearInputBtn = document.getElementById('clearInputBtn');

    // Update character count as user types
    if (inputText && charCount) {
        inputText.addEventListener('input', function() {
            const count = this.value.length;
            charCount.textContent = count + ' character' + (count !== 1 ? 's' : '');
        });
    }

    // Case conversion functions
    function toUpperCase(text) {
        return text.toUpperCase();
    }

    function toLowerCase(text) {
        return text.toLowerCase();
    }

    function toTitleCase(text) {
        return text
            .toLowerCase()
            .split(/\s+/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    function toSentenceCase(text) {
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }

    function toToggleCase(text) {
        return text
            .split('')
            .map(char => {
                if (char === char.toUpperCase()) {
                    return char.toLowerCase();
                } else if (char === char.toLowerCase()) {
                    return char.toUpperCase();
                }
                return char;
            })
            .join('');
    }

    // Convert text based on selected case type
    function convertCase(caseType) {
        const text = inputText.value;

        if (!text) {
            showStatus('Please enter some text first.', 'info');
            return;
        }

        let result = '';

        switch (caseType) {
            case 'uppercase':
                result = toUpperCase(text);
                break;
            case 'lowercase':
                result = toLowerCase(text);
                break;
            case 'titlecase':
                result = toTitleCase(text);
                break;
            case 'sentencecase':
                result = toSentenceCase(text);
                break;
            case 'togglecase':
                result = toToggleCase(text);
                break;
            default:
                result = text;
        }

        outputText.value = result;
        showStatus('Converted! ' + result.length + ' characters.', 'success');
    }

    // Button event listeners
    if (uppercaseBtn) uppercaseBtn.addEventListener('click', () => convertCase('uppercase'));
    if (lowercaseBtn) lowercaseBtn.addEventListener('click', () => convertCase('lowercase'));
    if (titlecaseBtn) titlecaseBtn.addEventListener('click', () => convertCase('titlecase'));
    if (sentencecaseBtn) sentencecaseBtn.addEventListener('click', () => convertCase('sentencecase'));
    if (togglecaseBtn) togglecaseBtn.addEventListener('click', () => convertCase('togglecase'));

    // Copy to clipboard
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
        const text = outputText.value;

        if (!text) {
            showStatus('No text to copy. Convert some text first.', 'info');
            return;
        }

        navigator.clipboard.writeText(text)
            .then(() => {
                showStatus('✓ Copied to clipboard!', 'success');
                setTimeout(() => clearStatus(), 2000);
            })
            .catch(() => {
                outputText.select();
                document.execCommand('copy');
                showStatus('✓ Copied to clipboard!', 'success');
                setTimeout(() => clearStatus(), 2000);
            });
        });
    }

    // Download as .txt file
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
        const text = outputText.value;

        if (!text) {
            showStatus('No text to download.', 'info');
            return;
        }

        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', 'converted-text.txt');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        showStatus('✓ Downloaded as converted-text.txt', 'success');
            setTimeout(() => clearStatus(), 2000);
        });
    }

    // Clear input
    if (clearInputBtn) {
        clearInputBtn.addEventListener('click', function() {
            if (inputText) inputText.value = '';
            if (outputText) outputText.value = '';
            if (charCount) charCount.textContent = '0 characters';
            clearStatus();
            if (inputText) inputText.focus();
        });
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            convertCase('uppercase');
        }
    });

    // Show status message
    function showStatus(message, type) {
        statusMessage.textContent = message;
        statusMessage.className = 'status-message ' + type;
    }

    // Clear status message
    function clearStatus() {
        statusMessage.textContent = '';
        statusMessage.className = 'status-message';
    }
});


// ============================================
// REMOVE EXTRA SPACES TOOL
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const trimBtn = document.getElementById('trimBtn');
    
    // Only run this code if we're on the Remove Extra Spaces page
    if (!trimBtn) return;

    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const charCount = document.querySelector('.char-count');
    const statusMessage = document.getElementById('statusMessage');
    
    const collapseBtn = document.getElementById('collapseBtn');
    const removeAllSpacesBtn = document.getElementById('removeAllBtn');
    const copyBtn = document.getElementById('copyBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const clearInputBtn = document.getElementById('clearInputBtn');

    // Update character count as user types
    if (inputText && charCount) {
        inputText.addEventListener('input', function() {
            const count = this.value.length;
            charCount.textContent = count + ' character' + (count !== 1 ? 's' : '');
        });
    }

    // Space removal functions
    function trimSpaces(text) {
        return text
            .split('\n')
            .map(line => line.trim().replace(/  +/g, ' '))
            .join('\n')
            .trim();
    }

    function collapseSpaces(text) {
        return text
            .split('\n')
            .map(line => line.replace(/  +/g, ' '))
            .join('\n');
    }

    function removeAllSpaces(text) {
        return text.replace(/\s+/g, '');
    }

    // Process text based on selected action
    function processText(action) {
        const text = inputText.value;

        if (!text) {
            showStatus('Please enter some text first.', 'info');
            return;
        }

        let result = '';
        let actionName = '';

        switch (action) {
            case 'trim':
                result = trimSpaces(text);
                actionName = 'Trimmed';
                break;
            case 'collapse':
                result = collapseSpaces(text);
                actionName = 'Collapsed';
                break;
            case 'removeall':
                result = removeAllSpaces(text);
                actionName = 'Removed all spaces';
                break;
            default:
                result = text;
        }

        outputText.value = result;
        const charsRemoved = text.length - result.length;
        showStatus(actionName + '! Removed ' + charsRemoved + ' character' + (charsRemoved !== 1 ? 's' : '') + '.', 'success');
    }

    // Button event listeners
    if (trimBtn) trimBtn.addEventListener('click', () => processText('trim'));
    if (collapseBtn) collapseBtn.addEventListener('click', () => processText('collapse'));
    if (removeAllSpacesBtn) removeAllSpacesBtn.addEventListener('click', () => processText('removeall'));

    // Copy to clipboard
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
        const text = outputText.value;

        if (!text) {
            showStatus('No text to copy. Process some text first.', 'info');
            return;
        }

        navigator.clipboard.writeText(text)
            .then(() => {
                showStatus('✓ Copied to clipboard!', 'success');
                setTimeout(() => clearStatus(), 2000);
            })
            .catch(() => {
                outputText.select();
                document.execCommand('copy');
                showStatus('✓ Copied to clipboard!', 'success');
                setTimeout(() => clearStatus(), 2000);
            });
        });
    }

    // Download as .txt file
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
        const text = outputText.value;

        if (!text) {
            showStatus('No text to download.', 'info');
            return;
        }

        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', 'cleaned-text.txt');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        showStatus('✓ Downloaded as cleaned-text.txt', 'success');
            setTimeout(() => clearStatus(), 2000);
        });
    }

    // Clear input
    if (clearInputBtn) {
        clearInputBtn.addEventListener('click', function() {
            if (inputText) inputText.value = '';
            if (outputText) outputText.value = '';
            if (charCount) charCount.textContent = '0 characters';
            clearStatus();
            if (inputText) inputText.focus();
        });
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            processText('trim');
        }
    });

    // Show status message
    function showStatus(message, type) {
        statusMessage.textContent = message;
        statusMessage.className = 'status-message ' + type;
    }

    // Clear status message
    function clearStatus() {
        statusMessage.textContent = '';
        statusMessage.className = 'status-message';
    }
});


// ============================================
// REMOVE LINE BREAKS TOOL
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const spaceBtn = document.getElementById('spaceBtn');
    
    // Only run this code if we're on the Remove Line Breaks page
    if (!spaceBtn || document.getElementById('repeatCount')) return;

    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const charCount = document.querySelector('.char-count');
    const statusMessage = document.getElementById('statusMessage');
    
    const commaBtn = document.getElementById('commaBtn');
    const semicolonBtn = document.getElementById('semicolonBtn');
    const noneBtn = document.getElementById('noneBtn');
    const preserveParagraphsCheckbox = document.getElementById('preserveParagraphsCheckbox');
    const copyBtn = document.getElementById('copyBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const clearInputBtn = document.getElementById('clearInputBtn');

    // Update character count as user types
    if (inputText && charCount) {
        inputText.addEventListener('input', function() {
            const count = this.value.length;
            charCount.textContent = count + ' character' + (count !== 1 ? 's' : '');
        });
    }

    // Line break removal functions
    function removeLineBreaks(text, separator, preserveParagraphs) {
        let result = '';

        if (preserveParagraphs) {
            const paragraphs = text.split(/\n\s*\n/);
            
            result = paragraphs.map(paragraph => {
                const lines = paragraph.split('\n').map(line => line.trim()).filter(line => line.length > 0);
                
                switch (separator) {
                    case 'space':
                        return lines.join(' ');
                    case 'comma':
                        return lines.join(', ');
                    case 'semicolon':
                        return lines.join('; ');
                    case 'none':
                        return lines.join('');
                    default:
                        return lines.join(' ');
                }
            }).join('\n\n');
        } else {
            const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
            
            switch (separator) {
                case 'space':
                    result = lines.join(' ');
                    break;
                case 'comma':
                    result = lines.join(', ');
                    break;
                case 'semicolon':
                    result = lines.join('; ');
                    break;
                case 'none':
                    result = lines.join('');
                    break;
                default:
                    result = lines.join(' ');
            }
        }

        return result;
    }

    // Process text based on selected separator
    function processText(separator) {
        const text = inputText.value;

        if (!text) {
            showStatus('Please enter some text first.', 'info');
            return;
        }

        const preserveParagraphs = preserveParagraphsCheckbox ? preserveParagraphsCheckbox.checked : false;
        const result = removeLineBreaks(text, separator, preserveParagraphs);

        outputText.value = result;
        const linesRemoved = (text.match(/\n/g) || []).length;
        showStatus('Done! Removed ' + linesRemoved + ' line break' + (linesRemoved !== 1 ? 's' : '') + '.', 'success');
    }

    // Button event listeners
    if (spaceBtn) spaceBtn.addEventListener('click', () => processText('space'));
    if (commaBtn) commaBtn.addEventListener('click', () => processText('comma'));
    if (semicolonBtn) semicolonBtn.addEventListener('click', () => processText('semicolon'));
    if (noneBtn) noneBtn.addEventListener('click', () => processText('none'));

    // Copy to clipboard
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
        const text = outputText.value;

        if (!text) {
            showStatus('No text to copy. Process some text first.', 'info');
            return;
        }

        navigator.clipboard.writeText(text)
            .then(() => {
                showStatus('✓ Copied to clipboard!', 'success');
                setTimeout(() => clearStatus(), 2000);
            })
            .catch(() => {
                outputText.select();
                document.execCommand('copy');
                showStatus('✓ Copied to clipboard!', 'success');
                setTimeout(() => clearStatus(), 2000);
            });
        });
    }

    // Download as .txt file
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
        const text = outputText.value;

        if (!text) {
            showStatus('No text to download.', 'info');
            return;
        }

        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', 'joined-text.txt');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        showStatus('✓ Downloaded as joined-text.txt', 'success');
            setTimeout(() => clearStatus(), 2000);
        });
    }

    // Clear input
    if (clearInputBtn) {
        clearInputBtn.addEventListener('click', function() {
            if (inputText) inputText.value = '';
            if (outputText) outputText.value = '';
            if (charCount) charCount.textContent = '0 characters';
            clearStatus();
            if (inputText) inputText.focus();
        });
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            processText('space');
        }
    });

    // Show status message
    function showStatus(message, type) {
        statusMessage.textContent = message;
        statusMessage.className = 'status-message ' + type;
    }

    // Clear status message
    function clearStatus() {
        statusMessage.textContent = '';
        statusMessage.className = 'status-message';
    }
});


// ============================================
// TEXT REPEATER TOOL
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const repeatCount = document.getElementById('repeatCount');
    
    // Only run this code if we're on the Text Repeater page
    if (!repeatCount) return;

    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const charCount = document.querySelector('.char-count');
    const statusMessage = document.getElementById('statusMessage');
    
    const newlineBtn = document.getElementById('newlineBtn');
    const spaceBtn = document.getElementById('spaceBtn');
    const commaBtn = document.getElementById('commaBtn');
    const noneBtn = document.getElementById('noneBtn');
    const copyBtn = document.getElementById('copyBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const clearInputBtn = document.getElementById('clearInputBtn');

    // Update character count as user types
    if (inputText && charCount) {
        inputText.addEventListener('input', function() {
            const count = this.value.length;
            charCount.textContent = count + ' character' + (count !== 1 ? 's' : '');
        });
    }

    // Text repetition function
    function repeatText(text, times, separator) {
        if (times < 1) return '';
        if (times > 1000) times = 1000;

        const repeated = [];
        for (let i = 0; i < times; i++) {
            repeated.push(text);
        }

        let result = '';
        switch (separator) {
            case 'newline':
                result = repeated.join('\n');
                break;
            case 'space':
                result = repeated.join(' ');
                break;
            case 'comma':
                result = repeated.join(', ');
                break;
            case 'none':
                result = repeated.join('');
                break;
            default:
                result = repeated.join('\n');
        }
        return result;
    }

    // Process text based on selected separator
    function processText(separator) {
        const text = inputText.value;
        let times = parseInt(repeatCount.value) || 1;

        if (!text) {
            showStatus('Please enter some text first.', 'info');
            return;
        }

        if (times < 1 || isNaN(times)) {
            showStatus('Please enter a valid number (1-1000).', 'error');
            return;
        }

        if (times > 1000) {
            showStatus('⚠ Limited to 1000 repetitions. Repeating 1000 times.', 'info');
            times = 1000;
        }

        const result = repeatText(text, times, separator);
        outputText.value = result;
        showStatus('Done! Generated ' + result.length + ' characters from ' + times + ' repetitions.', 'success');
    }

    // Button event listeners
    if (newlineBtn) newlineBtn.addEventListener('click', () => processText('newline'));
    if (spaceBtn) spaceBtn.addEventListener('click', () => processText('space'));
    if (commaBtn) commaBtn.addEventListener('click', () => processText('comma'));
    if (noneBtn) noneBtn.addEventListener('click', () => processText('none'));

    // Allow Enter key in repeat count field to process
    if (repeatCount) {
        repeatCount.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            processText('newline');
        }
        });
    }

    // Copy to clipboard
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
        const text = outputText.value;

        if (!text) {
            showStatus('No text to copy. Repeat some text first.', 'info');
            return;
        }

        navigator.clipboard.writeText(text)
            .then(() => {
                showStatus('✓ Copied to clipboard!', 'success');
                setTimeout(() => clearStatus(), 2000);
            })
            .catch(() => {
                outputText.select();
                document.execCommand('copy');
                showStatus('✓ Copied to clipboard!', 'success');
                setTimeout(() => clearStatus(), 2000);
            });
        });
    }

    // Download as .txt file
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
        const text = outputText.value;

        if (!text) {
            showStatus('No text to download.', 'info');
            return;
        }

        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', 'repeated-text.txt');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        showStatus('✓ Downloaded as repeated-text.txt', 'success');
            setTimeout(() => clearStatus(), 2000);
        });
    }

    // Clear input
    if (clearInputBtn) {
        clearInputBtn.addEventListener('click', function() {
            if (inputText) inputText.value = '';
            if (outputText) outputText.value = '';
            if (charCount) charCount.textContent = '0 characters';
            if (repeatCount) repeatCount.value = '3';
            clearStatus();
            if (inputText) inputText.focus();
        });
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            processText('newline');
        }
    });

    // Show status message
    function showStatus(message, type) {
        statusMessage.textContent = message;
        statusMessage.className = 'status-message ' + type;
    }

    // Clear status message
    function clearStatus() {
        statusMessage.textContent = '';
        statusMessage.className = 'status-message';
    }
});
// ============================================
// TRIM WHITESPACE TOOL
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const trimAllBtn = document.getElementById('trimAllBtn');
    
    // Only run this code if we're on the Trim Whitespace page
    if (!trimAllBtn) return;

    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const charCount = document.querySelector('.char-count');
    const statusMessage = document.getElementById('statusMessage');
    
    const trimStartBtn = document.getElementById('trimStartBtn');
    const trimEndBtn = document.getElementById('trimEndBtn');
    const eachLineCheckbox = document.getElementById('eachLineCheckbox');
    const collapseSpacesCheckbox = document.getElementById('collapseSpacesCheckbox');
    const copyBtn = document.getElementById('copyBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const clearInputBtn = document.getElementById('clearInputBtn');

    // Update character count as user types
    if (inputText && charCount) {
        inputText.addEventListener('input', function() {
            const count = this.value.length;
            charCount.textContent = count + ' character' + (count !== 1 ? 's' : '');
        });
    }

    // Trim functions
    function trimAllWhitespace(text, eachLine, collapseSpaces) {
        let result = text;
        
        if (eachLine) {
            result = result
                .split('\n')
                .map(line => {
                    let trimmed = line.trim();
                    if (collapseSpaces) {
                        trimmed = trimmed.replace(/  +/g, ' ');
                    }
                    return trimmed;
                })
                .join('\n')
                .trim();
        } else {
            result = result.trim();
            if (collapseSpaces) {
                result = result.replace(/  +/g, ' ');
            }
        }
        
        return result;
    }

    function trimStartWhitespace(text, eachLine, collapseSpaces) {
        let result = text;
        
        if (eachLine) {
            result = result
                .split('\n')
                .map(line => {
                    let trimmed = line.replace(/^\s+/, '');
                    if (collapseSpaces) {
                        trimmed = trimmed.replace(/  +/g, ' ');
                    }
                    return trimmed;
                })
                .join('\n')
                .replace(/^\s+/, '');
        } else {
            result = result.replace(/^\s+/, '');
            if (collapseSpaces) {
                result = result.replace(/  +/g, ' ');
            }
        }
        
        return result;
    }

    function trimEndWhitespace(text, eachLine, collapseSpaces) {
        let result = text;
        
        if (eachLine) {
            result = result
                .split('\n')
                .map(line => {
                    let trimmed = line.replace(/\s+$/, '');
                    if (collapseSpaces) {
                        trimmed = trimmed.replace(/  +/g, ' ');
                    }
                    return trimmed;
                })
                .join('\n')
                .replace(/\s+$/, '');
        } else {
            result = result.replace(/\s+$/, '');
            if (collapseSpaces) {
                result = result.replace(/  +/g, ' ');
            }
        }
        
        return result;
    }

    // Process text based on selected action
    function processText(action) {
        const text = inputText.value;
        const eachLine = eachLineCheckbox.checked;
        const collapseSpaces = collapseSpacesCheckbox.checked;

        if (!text) {
            showStatus('Please enter some text first.', 'info');
            return;
        }

        let result = '';
        let actionName = '';

        switch (action) {
            case 'all':
                result = trimAllWhitespace(text, eachLine, collapseSpaces);
                actionName = 'Trimmed all whitespace';
                break;
            case 'start':
                result = trimStartWhitespace(text, eachLine, collapseSpaces);
                actionName = 'Trimmed start whitespace';
                break;
            case 'end':
                result = trimEndWhitespace(text, eachLine, collapseSpaces);
                actionName = 'Trimmed end whitespace';
                break;
            default:
                result = text;
        }

        outputText.value = result;
        const charsRemoved = text.length - result.length;
        showStatus(actionName + '! Removed ' + charsRemoved + ' character' + (charsRemoved !== 1 ? 's' : '') + '.', 'success');
    }

    // Button event listeners
    if (trimAllBtn) trimAllBtn.addEventListener('click', () => processText('all'));
    if (trimStartBtn) trimStartBtn.addEventListener('click', () => processText('start'));
    if (trimEndBtn) trimEndBtn.addEventListener('click', () => processText('end'));

    // Copy to clipboard
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
        const text = outputText.value;

        if (!text) {
            showStatus('No text to copy. Trim some text first.', 'info');
            return;
        }

        navigator.clipboard.writeText(text)
            .then(() => {
                showStatus('✓ Copied to clipboard!', 'success');
                setTimeout(() => clearStatus(), 2000);
            })
            .catch(() => {
                outputText.select();
                document.execCommand('copy');
                showStatus('✓ Copied to clipboard!', 'success');
                setTimeout(() => clearStatus(), 2000);
            });
        });
    }

    // Download as .txt file
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
        const text = outputText.value;

        if (!text) {
            showStatus('No text to download.', 'info');
            return;
        }

        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', 'trimmed-text.txt');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        showStatus('✓ Downloaded as trimmed-text.txt', 'success');
            setTimeout(() => clearStatus(), 2000);
        });
    }

    // Clear input
    if (clearInputBtn) {
        clearInputBtn.addEventListener('click', function() {
            if (inputText) inputText.value = '';
            if (outputText) outputText.value = '';
            if (charCount) charCount.textContent = '0 characters';
            if (eachLineCheckbox) eachLineCheckbox.checked = true;
            if (collapseSpacesCheckbox) collapseSpacesCheckbox.checked = false;
            clearStatus();
            if (inputText) inputText.focus();
        });
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            processText('all');
        }
    });

    // Show status message
    function showStatus(message, type) {
        statusMessage.textContent = message;
        statusMessage.className = 'status-message ' + type;
    }

    // Clear status message
    function clearStatus() {
        statusMessage.textContent = '';
        statusMessage.className = 'status-message';
    }
});
// ============================================
// REMOVE EMOJIS TOOL
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const removeEmojisBtn = document.getElementById('removeEmojisBtn');
    
    // Only run this code if we're on the Remove Emojis page
    if (!removeEmojisBtn) return;

    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const charCount = document.querySelector('.char-count');
    const statusMessage = document.getElementById('statusMessage');
    
    const replaceEmojisBtn = document.getElementById('replaceEmojisBtn');
    const trimSpacesCheckbox = document.getElementById('trimSpacesCheckbox');
    const copyBtn = document.getElementById('copyBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const clearInputBtn = document.getElementById('clearInputBtn');

    // Update character count as user types
    if (inputText && charCount) {
        inputText.addEventListener('input', function() {
            const count = this.value.length;
            charCount.textContent = count + ' character' + (count !== 1 ? 's' : '');
        });
    }

    // Comprehensive emoji regex pattern
    const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F900}-\u{1F9FF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{1F700}-\u{1F77F}]|[\u{1F780}-\u{1F7FF}]|[\u{1F800}-\u{1F8FF}]|[\u{1F900}-\u{1F9FF}]|[\u{2300}-\u{23FF}]|[\u{2B50}]|[\u{200D}]|[\u{FE0F}]/gu;

    // Remove emojis function
    function removeEmojis(text, trimSpaces) {
        const emojiCount = (text.match(emojiRegex) || []).length;
        let result = text.replace(emojiRegex, '');
        
        if (trimSpaces) {
            // Remove extra spaces created by emoji removal
            result = result.replace(/  +/g, ' ').trim();
        }
        
        return { result, emojiCount };
    }

    // Replace emojis with placeholder
    function replaceEmojis(text, trimSpaces) {
        const emojiCount = (text.match(emojiRegex) || []).length;
        let result = text.replace(emojiRegex, '[emoji]');
        
        if (trimSpaces) {
            // Remove extra spaces
            result = result.replace(/  +/g, ' ').trim();
        }
        
        return { result, emojiCount };
    }

    // Process text based on selected action
    function processText(action) {
        const text = inputText.value;
        const trimSpaces = trimSpacesCheckbox ? trimSpacesCheckbox.checked : false;

        if (!text) {
            showStatus('Please enter some text first.', 'info');
            return;
        }

        let processedData = {};
        let actionName = '';

        switch (action) {
            case 'remove':
                processedData = removeEmojis(text, trimSpaces);
                actionName = 'Removed';
                break;
            case 'replace':
                processedData = replaceEmojis(text, trimSpaces);
                actionName = 'Replaced';
                break;
            default:
                processedData = { result: text, emojiCount: 0 };
        }

        outputText.value = processedData.result;
        
        if (processedData.emojiCount > 0) {
            showStatus(actionName + ' ' + processedData.emojiCount + ' emoji' + (processedData.emojiCount !== 1 ? 's' : '') + '!', 'success');
        } else {
            showStatus('No emojis found in text.', 'info');
        }
    }

    // Button event listeners
    if (removeEmojisBtn) removeEmojisBtn.addEventListener('click', () => processText('remove'));
    if (replaceEmojisBtn) replaceEmojisBtn.addEventListener('click', () => processText('replace'));

    // Copy to clipboard
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
        const text = outputText.value;

        if (!text) {
            showStatus('No text to copy. Remove emojis first.', 'info');
            return;
        }

        navigator.clipboard.writeText(text)
            .then(() => {
                showStatus('✓ Copied to clipboard!', 'success');
                setTimeout(() => clearStatus(), 2000);
            })
            .catch(() => {
                outputText.select();
                document.execCommand('copy');
                showStatus('✓ Copied to clipboard!', 'success');
                setTimeout(() => clearStatus(), 2000);
            });
        });
    }

    // Download as .txt file
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
        const text = outputText.value;

        if (!text) {
            showStatus('No text to download.', 'info');
            return;
        }

        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', 'text-no-emojis.txt');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        showStatus('✓ Downloaded as text-no-emojis.txt', 'success');
            setTimeout(() => clearStatus(), 2000);
        });
    }

    // Clear input
    if (clearInputBtn) {
        clearInputBtn.addEventListener('click', function() {
            if (inputText) inputText.value = '';
            if (outputText) outputText.value = '';
            if (charCount) charCount.textContent = '0 characters';
            if (trimSpacesCheckbox) trimSpacesCheckbox.checked = true;
            clearStatus();
            if (inputText) inputText.focus();
        });
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            processText('remove');
        }
    });

    // Show status message
    function showStatus(message, type) {
        statusMessage.textContent = message;
        statusMessage.className = 'status-message ' + type;
    }

    // Clear status message
    function clearStatus() {
        statusMessage.textContent = '';
        statusMessage.className = 'status-message';
    }
});
// ============================================
// REVERSE TEXT TOOL
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const reverseCharsBtn = document.getElementById('reverseCharsBtn');
    
    // Only run this code if we're on the Reverse Text page
    if (!reverseCharsBtn) return;

    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const charCount = document.querySelector('.char-count');
    const statusMessage = document.getElementById('statusMessage');
    
    const reverseWordsBtn = document.getElementById('reverseWordsBtn');
    const reverseLinesBtn = document.getElementById('reverseLinesBtn');
    const copyBtn = document.getElementById('copyBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const clearInputBtn = document.getElementById('clearInputBtn');

    // Update character count as user types
    if (inputText && charCount) {
        inputText.addEventListener('input', function() {
            const count = this.value.length;
            charCount.textContent = count + ' character' + (count !== 1 ? 's' : '');
        });
    }

    // Reverse functions
    function reverseCharacters(text) {
        return text.split('').reverse().join('');
    }

    function reverseWords(text) {
        return text
            .split(/\s+/)
            .reverse()
            .join(' ');
    }

    function reverseLines(text) {
        return text
            .split('\n')
            .reverse()
            .join('\n');
    }

    // Process text based on selected type
    function processText(type) {
        const text = inputText.value;

        if (!text) {
            showStatus('Please enter some text first.', 'info');
            return;
        }

        let result = '';
        let actionName = '';

        switch (type) {
            case 'chars':
                result = reverseCharacters(text);
                actionName = 'Reversed characters';
                break;
            case 'words':
                result = reverseWords(text);
                actionName = 'Reversed word order';
                break;
            case 'lines':
                result = reverseLines(text);
                actionName = 'Reversed line order';
                break;
            default:
                result = text;
        }

        outputText.value = result;
        showStatus(actionName + '!', 'success');
    }

    // Button event listeners
    if (reverseCharsBtn) reverseCharsBtn.addEventListener('click', () => processText('chars'));
    if (reverseWordsBtn) reverseWordsBtn.addEventListener('click', () => processText('words'));
    if (reverseLinesBtn) reverseLinesBtn.addEventListener('click', () => processText('lines'));

    // Copy to clipboard
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
        const text = outputText.value;

        if (!text) {
            showStatus('No text to copy. Reverse some text first.', 'info');
            return;
        }

        navigator.clipboard.writeText(text)
            .then(() => {
                showStatus('✓ Copied to clipboard!', 'success');
                setTimeout(() => clearStatus(), 2000);
            })
            .catch(() => {
                outputText.select();
                document.execCommand('copy');
                showStatus('✓ Copied to clipboard!', 'success');
                setTimeout(() => clearStatus(), 2000);
            });
        });
    }

    // Download as .txt file
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
        const text = outputText.value;

        if (!text) {
            showStatus('No text to download.', 'info');
            return;
        }

        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', 'reversed-text.txt');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        showStatus('✓ Downloaded as reversed-text.txt', 'success');
            setTimeout(() => clearStatus(), 2000);
        });
    }

    // Clear input
    if (clearInputBtn) {
        clearInputBtn.addEventListener('click', function() {
            if (inputText) inputText.value = '';
            if (outputText) outputText.value = '';
            if (charCount) charCount.textContent = '0 characters';
            clearStatus();
            if (inputText) inputText.focus();
        });
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            processText('chars');
        }
    });

    // Show status message
    function showStatus(message, type) {
        statusMessage.textContent = message;
        statusMessage.className = 'status-message ' + type;
    }

    // Clear status message
    function clearStatus() {
        statusMessage.textContent = '';
        statusMessage.className = 'status-message';
    }
});
// ============================================
// REMOVE PUNCTUATION TOOL
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const removeAllBtn = document.getElementById('removeAllBtn');
    const removeBasicBtn = document.getElementById('removeBasicBtn');
    
    // Only run this code if we're on the Remove Punctuation page (both buttons must exist)
    if (!removeAllBtn || !removeBasicBtn) return;

    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const charCount = document.querySelector('.char-count');
    const statusMessage = document.getElementById('statusMessage');
    
    const keepPeriodsCheckbox = document.getElementById('keepPeriodsCheckbox');
    const keepCommasCheckbox = document.getElementById('keepCommasCheckbox');
    const keepQuotesCheckbox = document.getElementById('keepQuotesCheckbox');
    const trimSpacesCheckbox = document.getElementById('trimSpacesCheckbox');
    const copyBtn = document.getElementById('copyBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const clearInputBtn = document.getElementById('clearInputBtn');

    // Update character count as user types
    if (inputText && charCount) {
        inputText.addEventListener('input', function() {
            const count = this.value.length;
            charCount.textContent = count + ' character' + (count !== 1 ? 's' : '');
        });
    }

    // Punctuation removal functions
    function removeAllPunctuation(text, keepPeriods, keepCommas, keepQuotes, trimSpaces) {
        let result = text;
        
        // Build regex pattern based on exclusions
        let punctuationToRemove = '[.,!?;:\'"\\-()\\[\\]{}/@#$%^&*+=~`]';
        
        if (keepPeriods) {
            punctuationToRemove = '[,!?;:\'"\\-()\\[\\]{}/@#$%^&*+=~`]';
        }
        if (keepCommas) {
            punctuationToRemove = '[.!?;:\'"\\-()\\[\\]{}/@#$%^&*+=~`]';
        }
        if (keepQuotes) {
            punctuationToRemove = '[.,!?;:\\-()\\[\\]{}/@#$%^&*+=~`]';
        }
        
        // Handle combinations
        let toRemove = '';
        if (!keepPeriods) toRemove += '\\.';
        if (!keepCommas) toRemove += ',';
        toRemove += '!?;:';
        if (!keepQuotes) toRemove += '\'"';
        toRemove += '\\-()\\[\\]{}/@#$%^&*+=~`';
        
        result = result.replace(new RegExp('[' + toRemove + ']', 'g'), '');
        
        if (trimSpaces) {
            result = result.replace(/  +/g, ' ').trim();
        }
        
        return result;
    }

    function removeBasicPunctuation(text, keepPeriods, keepCommas, keepQuotes, trimSpaces) {
        let result = text;
        
        // Basic punctuation: . , ! ? ; :
        let toRemove = '';
        if (!keepPeriods) toRemove += '\\.';
        if (!keepCommas) toRemove += ',';
        toRemove += '!?;:';
        
        result = result.replace(new RegExp('[' + toRemove + ']', 'g'), '');
        
        if (trimSpaces) {
            result = result.replace(/  +/g, ' ').trim();
        }
        
        return result;
    }

    // Process text based on selected action
    function processText(action) {
        const text = inputText.value;
        const keepPeriods = keepPeriodsCheckbox ? keepPeriodsCheckbox.checked : false;
        const keepCommas = keepCommasCheckbox ? keepCommasCheckbox.checked : false;
        const keepQuotes = keepQuotesCheckbox ? keepQuotesCheckbox.checked : false;
        const trimSpaces = trimSpacesCheckbox ? trimSpacesCheckbox.checked : false;

        if (!text) {
            showStatus('Please enter some text first.', 'info');
            return;
        }

        let result = '';
        let actionName = '';

        switch (action) {
            case 'all':
                result = removeAllPunctuation(text, keepPeriods, keepCommas, keepQuotes, trimSpaces);
                actionName = 'Removed all punctuation';
                break;
            case 'basic':
                result = removeBasicPunctuation(text, keepPeriods, keepCommas, keepQuotes, trimSpaces);
                actionName = 'Removed basic punctuation';
                break;
            default:
                result = text;
        }

        outputText.value = result;
        const charsRemoved = text.length - result.length;
        showStatus(actionName + '! Removed ' + charsRemoved + ' character' + (charsRemoved !== 1 ? 's' : '') + '.', 'success');
    }

    // Button event listeners
    if (removeAllBtn) {
        removeAllBtn.addEventListener('click', () => processText('all'));
    }
    if (removeBasicBtn) {
        removeBasicBtn.addEventListener('click', () => processText('basic'));
    }

    // Copy to clipboard
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
        const text = outputText.value;

        if (!text) {
            showStatus('No text to copy. Remove punctuation first.', 'info');
            return;
        }

        navigator.clipboard.writeText(text)
            .then(() => {
                showStatus('✓ Copied to clipboard!', 'success');
                setTimeout(() => clearStatus(), 2000);
            })
            .catch(() => {
                outputText.select();
                document.execCommand('copy');
                showStatus('✓ Copied to clipboard!', 'success');
                setTimeout(() => clearStatus(), 2000);
            });
        });
    }

    // Download as .txt file
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
        const text = outputText.value;

        if (!text) {
            showStatus('No text to download.', 'info');
            return;
        }

        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', 'text-no-punctuation.txt');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        showStatus('✓ Downloaded as text-no-punctuation.txt', 'success');
            setTimeout(() => clearStatus(), 2000);
        });
    }

    // Clear input
    if (clearInputBtn) {
        clearInputBtn.addEventListener('click', function() {
            if (inputText) inputText.value = '';
            if (outputText) outputText.value = '';
            if (charCount) charCount.textContent = '0 characters';
            if (keepPeriodsCheckbox) keepPeriodsCheckbox.checked = false;
            if (keepCommasCheckbox) keepCommasCheckbox.checked = false;
            if (keepQuotesCheckbox) keepQuotesCheckbox.checked = false;
            if (trimSpacesCheckbox) trimSpacesCheckbox.checked = true;
            clearStatus();
            if (inputText) inputText.focus();
        });
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            processText('all');
        }
    });

    // Show status message
    function showStatus(message, type) {
        statusMessage.textContent = message;
        statusMessage.className = 'status-message ' + type;
    }

    // Clear status message
    function clearStatus() {
        statusMessage.textContent = '';
        statusMessage.className = 'status-message';
    }
});
// ============================================
// REMOVE NUMBERS TOOL
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const removeDigitsBtn = document.getElementById('removeDigitsBtn');
    const removeAllBtn = document.getElementById('removeAllBtn');
    
    // Only run this code if we're on the Remove Numbers page (both buttons must exist)
    if (!removeDigitsBtn || !removeAllBtn) return;

    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const charCount = document.querySelector('.char-count');
    const statusMessage = document.getElementById('statusMessage');
    
    const removeNumberWordsCheckbox = document.getElementById('removeNumberWordsCheckbox');
    const trimSpacesCheckbox = document.getElementById('trimSpacesCheckbox');
    const copyBtn = document.getElementById('copyBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const clearInputBtn = document.getElementById('clearInputBtn');

    // Update character count as user types
    if (inputText && charCount) {
        inputText.addEventListener('input', function() {
            const count = this.value.length;
            charCount.textContent = count + ' character' + (count !== 1 ? 's' : '');
        });
    }

    // Number removal functions
    function removeDigitsOnly(text, removeNumberWords, trimSpaces) {
        let result = text;
        
        // Remove all digits (0-9)
        result = result.replace(/\d/g, '');
        
        // Optionally remove number words
        if (removeNumberWords) {
            result = removeNumberWordsFunc(result);
        }
        
        if (trimSpaces) {
            result = result.replace(/  +/g, ' ').trim();
        }
        
        return result;
    }

    function removeAllNumbers(text, removeNumberWords, trimSpaces) {
        let result = text;
        
        // Remove complete number patterns: 5,250.75 or 5250 or 250.75 or .75
        result = result.replace(/\d+([,\s]?\d+)*(\.\d+)?/g, '');
        
        // Optionally remove number words
        if (removeNumberWords) {
            result = removeNumberWordsFunc(result);
        }
        
        if (trimSpaces) {
            result = result.replace(/  +/g, ' ').trim();
        }
        
        return result;
    }

    // Remove English number words
    function removeNumberWordsFunc(text) {
        const numberWords = [
            'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
            'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
            'seventeen', 'eighteen', 'nineteen', 'twenty', 'thirty', 'forty', 'fifty',
            'sixty', 'seventy', 'eighty', 'ninety', 'hundred', 'thousand', 'million',
            'billion', 'trillion', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth',
            'seventh', 'eighth', 'ninth', 'tenth'
        ];
        
        let result = text;
        
        // Create regex pattern for number words (case insensitive, word boundaries)
        numberWords.forEach(word => {
            const regex = new RegExp('\\b' + word + '\\b', 'gi');
            result = result.replace(regex, '');
        });
        
        return result;
    }

    // Process text based on selected action
    function processText(action) {
        const text = inputText.value;
        const removeNumberWords = removeNumberWordsCheckbox ? removeNumberWordsCheckbox.checked : false;
        const trimSpaces = trimSpacesCheckbox ? trimSpacesCheckbox.checked : false;

        if (!text) {
            showStatus('Please enter some text first.', 'info');
            return;
        }

        let result = '';
        let actionName = '';

        switch (action) {
            case 'digits':
                result = removeDigitsOnly(text, removeNumberWords, trimSpaces);
                actionName = 'Removed digits';
                break;
            case 'all':
                result = removeAllNumbers(text, removeNumberWords, trimSpaces);
                actionName = 'Removed all numbers';
                break;
            default:
                result = text;
        }

        outputText.value = result;
        const charsRemoved = text.length - result.length;
        showStatus(actionName + '! Removed ' + charsRemoved + ' character' + (charsRemoved !== 1 ? 's' : '') + '.', 'success');
    }

    // Button event listeners
    if (removeDigitsBtn) removeDigitsBtn.addEventListener('click', () => processText('digits'));
    if (removeAllBtn) removeAllBtn.addEventListener('click', () => processText('all'));

    // Copy to clipboard
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
        const text = outputText.value;

        if (!text) {
            showStatus('No text to copy. Remove numbers first.', 'info');
            return;
        }

        navigator.clipboard.writeText(text)
            .then(() => {
                showStatus('✓ Copied to clipboard!', 'success');
                setTimeout(() => clearStatus(), 2000);
            })
            .catch(() => {
                outputText.select();
                document.execCommand('copy');
                showStatus('✓ Copied to clipboard!', 'success');
                setTimeout(() => clearStatus(), 2000);
            });
        });
    }

    // Download as .txt file
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
        const text = outputText.value;

        if (!text) {
            showStatus('No text to download.', 'info');
            return;
        }

        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', 'text-no-numbers.txt');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        showStatus('✓ Downloaded as text-no-numbers.txt', 'success');
            setTimeout(() => clearStatus(), 2000);
        });
    }

    // Clear input
    if (clearInputBtn) {
        clearInputBtn.addEventListener('click', function() {
            if (inputText) inputText.value = '';
            if (outputText) outputText.value = '';
            if (charCount) charCount.textContent = '0 characters';
            if (removeNumberWordsCheckbox) removeNumberWordsCheckbox.checked = false;
            if (trimSpacesCheckbox) trimSpacesCheckbox.checked = true;
            clearStatus();
            if (inputText) inputText.focus();
        });
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            processText('digits');
        }
    });

    // Show status message
    function showStatus(message, type) {
        statusMessage.textContent = message;
        statusMessage.className = 'status-message ' + type;
    }

    // Clear status message
    function clearStatus() {
        statusMessage.textContent = '';
        statusMessage.className = 'status-message';
    }
});
// ============================================
// STRIP HTML TAGS TOOL
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const stripTagsBtn = document.getElementById('stripTagsBtn');
    
    // Only run this code if we're on the Strip HTML page
    if (!stripTagsBtn) return;

    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const charCount = document.querySelector('.char-count');
    const statusMessage = document.getElementById('statusMessage');
    
    const decodeEntitiesCheckbox = document.getElementById('decodeEntitiesCheckbox');
    const preserveLineBreaksCheckbox = document.getElementById('preserveLineBreaksCheckbox');
    const trimSpacesCheckbox = document.getElementById('trimSpacesCheckbox');
    const copyBtn = document.getElementById('copyBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const clearInputBtn = document.getElementById('clearInputBtn');

    // Update character count
    if (inputText && charCount) {
        inputText.addEventListener('input', function() {
            const count = this.value.length;
            charCount.textContent = count + ' character' + (count !== 1 ? 's' : '');
        });
    }

    // Decode HTML entities
    function decodeEntities(text) {
        const div = document.createElement('div');
        div.innerHTML = text;
        return div.textContent || div.innerText || '';
    }

    // Process text
    function processText() {
        let text = inputText.value;

        if (!text) {
            showStatus('Please enter some HTML first.', 'info');
            return;
        }

        // Count tags before removal
        const tagsRemoved = (text.match(/<[^>]*>/g) || []).length;

        // Step 1: Remove script and style tags with their content FIRST
        text = text.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        text = text.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');

        // Step 2: Check options
        const preserveBreaks = preserveLineBreaksCheckbox ? preserveLineBreaksCheckbox.checked : false;
        const decodeEntities_ = decodeEntitiesCheckbox ? decodeEntitiesCheckbox.checked : false;
        const trimSpaces = trimSpacesCheckbox ? trimSpacesCheckbox.checked : false;

        // Step 3: If preserving breaks, convert block-level tags to newlines BEFORE removing
        if (preserveBreaks) {
            text = text.replace(/<br\s*\/?>/gi, '\n');
            // Only convert closing tags to newlines to avoid double newlines
            text = text.replace(/<\/(p|div|li|h[1-6]|blockquote|section|article)>/gi, '\n');
            // Remove opening tags of block elements (don't replace with newline)
            text = text.replace(/<(p|div|li|h[1-6]|blockquote|section|article)[^>]*>/gi, '');
        }

        // Step 4: Remove all remaining HTML tags (replace with nothing, not space)
        text = text.replace(/<[^>]*>/g, '');
        
        // Step 5: Handle whitespace
        if (preserveBreaks) {
            // Keep newlines but clean up multiple spaces on each line
            // Split by newlines, collapse spaces on each line, rejoin
            text = text.split('\n').map(line => line.replace(/ +/g, ' ').trim()).join('\n');
            // Remove empty lines
            text = text.split('\n').filter(line => line.length > 0).join('\n');
        } else {
            // Collapse all whitespace to single space
            text = text.replace(/\s+/g, ' ');
        }

        // Step 6: Decode entities if enabled
        if (decodeEntities_) {
            text = decodeEntities(text);
        }

        // Step 6B: After decoding, collapse any multiple spaces (from &nbsp; etc)
        if (trimSpaces) {
            if (preserveBreaks) {
                // Collapse multiple spaces on each line (including decoded nbsp)
                text = text.split('\n').map(line => line.replace(/\s+/g, ' ').trim()).filter(line => line.length > 0).join('\n');
            } else {
                // Collapse all whitespace
                text = text.replace(/\s+/g, ' ');
            }
        }

        // Step 7: Trim start/end
        if (!trimSpaces) {
            text = text.trim();
        }

        outputText.value = text;
        showStatus('Done! Removed ' + tagsRemoved + ' tag' + (tagsRemoved !== 1 ? 's' : '') + '.', 'success');
    }

    // Button listeners
    if (stripTagsBtn) {
        stripTagsBtn.addEventListener('click', processText);
    }

    // Copy to clipboard
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            const text = outputText.value;
            if (!text) {
                showStatus('No text to copy.', 'info');
                return;
            }
            navigator.clipboard.writeText(text).then(() => {
                showStatus('✓ Copied!', 'success');
                setTimeout(() => clearStatus(), 2000);
            }).catch(() => {
                outputText.select();
                document.execCommand('copy');
                showStatus('✓ Copied!', 'success');
                setTimeout(() => clearStatus(), 2000);
            });
        });
    }

    // Download
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
        const text = outputText.value;
        if (!text) {
            showStatus('No text to download.', 'info');
            return;
        }
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', 'text-no-html.txt');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        showStatus('✓ Downloaded!', 'success');
        setTimeout(() => clearStatus(), 2000);
        });
    }

    // Clear
    if (clearInputBtn) {
        clearInputBtn.addEventListener('click', function() {
            if (inputText) inputText.value = '';
            if (outputText) outputText.value = '';
            if (charCount) charCount.textContent = '0 characters';
            clearStatus();
            if (inputText) inputText.focus();
        });
    }

    // Keyboard shortcut
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            processText();
        }
    });

    function showStatus(msg, type) {
        statusMessage.textContent = msg;
        statusMessage.className = 'status-message ' + type;
    }

    function clearStatus() {
        statusMessage.textContent = '';
        statusMessage.className = 'status-message';
    }
});
// ============================================
// ESCAPE/UNESCAPE HTML ENTITIES TOOL
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const escapeBtn = document.getElementById('escapeBtn');
    const unescapeBtn = document.getElementById('unescapeBtn');
    
    // Only run this code if we're on the Escape/Unescape HTML page (both buttons must exist)
    if (!escapeBtn || !unescapeBtn) return;

    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const charCount = document.querySelector('.char-count');
    const statusMessage = document.getElementById('statusMessage');
    
    const escapeAllCheckbox = document.getElementById('escapeAllCheckbox');
    const copyBtn = document.getElementById('copyBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const clearInputBtn = document.getElementById('clearInputBtn');

    // Update character count as user types
    if (inputText && charCount) {
        inputText.addEventListener('input', function() {
            const count = this.value.length;
            charCount.textContent = count + ' character' + (count !== 1 ? 's' : '');
        });
    }

    // Escape text to HTML entities
    function escapeToEntities(text, escapeAll) {
        const charToEntity = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };
        
        if (escapeAll) {
            charToEntity['@'] = '&#64;';
            charToEntity['$'] = '&#36;';
            charToEntity['+'] = '&#43;';
            charToEntity['='] = '&#61;';
            charToEntity['?'] = '&#63;';
            charToEntity['/'] = '&#47;';
            charToEntity['%'] = '&#37;';
            charToEntity[':'] = '&#58;';
            charToEntity[';'] = '&#59;';
            charToEntity[','] = '&#44;';
            charToEntity['.'] = '&#46;';
            charToEntity['!'] = '&#33;';
            charToEntity['('] = '&#40;';
            charToEntity[')'] = '&#41;';
            charToEntity['['] = '&#91;';
            charToEntity[']'] = '&#93;';
            charToEntity['{'] = '&#123;';
            charToEntity['}'] = '&#125;';
            charToEntity['#'] = '&#35;';
            charToEntity['*'] = '&#42;';
            charToEntity['`'] = '&#96;';
            charToEntity['~'] = '&#126;';
            charToEntity['^'] = '&#94;';
            charToEntity['\\'] = '&#92;';
            charToEntity['|'] = '&#124;';
        }
        
        let result = '';
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            result += charToEntity[char] || char;
        }
        
        return result;
    }

    // Unescape HTML entities to text
    function unescapeToText(text) {
        const entityMap = {
            '&amp;': '&',
            '&lt;': '<',
            '&gt;': '>',
            '&quot;': '"',
            '&#39;': "'",
            '&apos;': "'",
            '&nbsp;': ' ',
            '&copy;': '©',
            '&reg;': '®',
            '&trade;': '™',
            '&euro;': '€',
            '&pound;': '£',
            '&yen;': '¥',
            '&cent;': '¢',
            '&sect;': '§',
            '&para;': '¶',
            '&times;': '×',
            '&divide;': '÷',
            '&iexcl;': '¡',
            '&iquest;': '¿'
        };
        
        let result = text;
        
        // Replace named entities
        for (const entity in entityMap) {
            result = result.replace(new RegExp(entity, 'g'), entityMap[entity]);
        }
        
        // Handle numeric entities like &#123; or &#x1A;
        result = result.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(parseInt(dec, 10)));
        result = result.replace(/&#x([0-9a-f]+);/gi, (match, hex) => String.fromCharCode(parseInt(hex, 16)));
        
        return result;
    }

    // Process text based on selected action
    function processText(action) {
        const text = inputText.value;
        const escapeAll = escapeAllCheckbox ? escapeAllCheckbox.checked : false;

        if (!text) {
            showStatus('Please enter some text first.', 'info');
            return;
        }

        let result = '';
        let actionName = '';

        switch (action) {
            case 'escape':
                result = escapeToEntities(text, escapeAll);
                actionName = 'Escaped to entities';
                break;
            case 'unescape':
                result = unescapeToText(text);
                actionName = 'Unescaped to text';
                break;
            default:
                result = text;
        }

        outputText.value = result;
        const charsChanged = Math.abs(text.length - result.length);
        showStatus(actionName + '! Changed ' + charsChanged + ' character' + (charsChanged !== 1 ? 's' : '') + '.', 'success');
    }

    // Button event listeners
    if (escapeBtn) escapeBtn.addEventListener('click', () => processText('escape'));
    if (unescapeBtn) unescapeBtn.addEventListener('click', () => processText('unescape'));

    // Copy to clipboard
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
        const text = outputText.value;

        if (!text) {
            showStatus('No text to copy. Convert some text first.', 'info');
            return;
        }

        navigator.clipboard.writeText(text)
            .then(() => {
                showStatus('✓ Copied to clipboard!', 'success');
                setTimeout(() => clearStatus(), 2000);
            })
            .catch(() => {
                outputText.select();
                document.execCommand('copy');
                showStatus('✓ Copied to clipboard!', 'success');
                setTimeout(() => clearStatus(), 2000);
            });
        });
    }

    // Download as .txt file
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
        const text = outputText.value;

        if (!text) {
            showStatus('No text to download.', 'info');
            return;
        }

        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', 'converted-entities.txt');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        showStatus('✓ Downloaded as converted-entities.txt', 'success');
            setTimeout(() => clearStatus(), 2000);
        });
    }

    // Clear input
    if (clearInputBtn) {
        clearInputBtn.addEventListener('click', function() {
            if (inputText) inputText.value = '';
            if (outputText) outputText.value = '';
            if (charCount) charCount.textContent = '0 characters';
            if (escapeAllCheckbox) escapeAllCheckbox.checked = false;
            clearStatus();
            if (inputText) inputText.focus();
        });
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            processText('escape');
        }
    });

    // Show status message
    function showStatus(message, type) {
        statusMessage.textContent = message;
        statusMessage.className = 'status-message ' + type;
    }

    // Clear status message
    function clearStatus() {
        statusMessage.textContent = '';
        statusMessage.className = 'status-message';
    }
});