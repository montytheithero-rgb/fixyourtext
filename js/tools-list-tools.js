// ============================================
// LIST TOOLS - CLEAN VERSION
// ============================================
// 10 List Tools: Alphabetize, Remove Duplicates, Sort, Reverse, Randomize, Clean, Filter, Extract Emails, Extract URLs, Merge/Split

// ============================================
// ALPHABETIZE LIST TOOL
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const sortAscBtn = document.getElementById('sortAscBtn');
    if (!sortAscBtn) return;

    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const charCount = document.querySelector('.char-count');
    const statusMessage = document.getElementById('statusMessage');
    const sortDescBtn = document.getElementById('sortDescBtn');
    const caseSensitiveCheckbox = document.getElementById('caseSensitiveCheckbox');
    const removeDuplicatesCheckbox = document.getElementById('removeDuplicatesCheckbox');
    const copyBtn = document.getElementById('copyBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const clearInputBtn = document.getElementById('clearInputBtn');

    if (inputText && charCount) {
        inputText.addEventListener('input', function() {
            const count = this.value.length;
            charCount.textContent = count + ' character' + (count !== 1 ? 's' : '');
        });
    }

    function alphabetizeList(text, order, caseSensitive, removeDuplicates) {
        const lines = text.split('\n').filter(line => line.trim().length > 0);
        let uniqueLines = lines;
        
        if (removeDuplicates) {
            const seen = new Set();
            uniqueLines = [];
            for (const line of lines) {
                const key = caseSensitive ? line : line.toLowerCase();
                if (!seen.has(key)) {
                    seen.add(key);
                    uniqueLines.push(line);
                }
            }
        }
        
        uniqueLines.sort(function(a, b) {
            if (caseSensitive) {
                // True case-sensitive: compare character codes (A=65, a=97, so A comes before a)
                for (let i = 0; i < Math.min(a.length, b.length); i++) {
                    const charCodeA = a.charCodeAt(i);
                    const charCodeB = b.charCodeAt(i);
                    
                    if (charCodeA !== charCodeB) {
                        if (order === 'asc') {
                            return charCodeA - charCodeB;
                        } else {
                            return charCodeB - charCodeA;
                        }
                    }
                }
                // If all compared characters are equal, shorter string comes first
                if (order === 'asc') {
                    return a.length - b.length;
                } else {
                    return b.length - a.length;
                }
            } else {
                // Case-insensitive: convert to lowercase and compare
                const aKey = a.toLowerCase();
                const bKey = b.toLowerCase();
                if (order === 'asc') {
                    return aKey.localeCompare(bKey);
                } else {
                    return bKey.localeCompare(aKey);
                }
            }
        });
        
        return uniqueLines.join('\n');
    }

    function processText(order) {
        const text = inputText.value;
        if (!text.trim()) {
            showStatus('Please enter some text first.', 'info');
            return;
        }

        const caseSensitive = caseSensitiveCheckbox ? caseSensitiveCheckbox.checked : false;
        const removeDuplicates = removeDuplicatesCheckbox ? removeDuplicatesCheckbox.checked : false;
        const result = alphabetizeList(text, order, caseSensitive, removeDuplicates);

        outputText.value = result;
        const originalLines = text.split('\n').filter(l => l.trim().length > 0).length;
        const resultLines = result.split('\n').filter(l => l.trim().length > 0).length;
        showStatus('Sorted! ' + resultLines + ' line' + (resultLines !== 1 ? 's' : '') + ' (from ' + originalLines + ').', 'success');
    }

    if (sortAscBtn) sortAscBtn.addEventListener('click', () => processText('asc'));
    if (sortDescBtn) sortDescBtn.addEventListener('click', () => processText('desc'));

    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            const text = outputText.value;
            if (!text) {
                showStatus('No text to copy. Sort some text first.', 'info');
                return;
            }
            navigator.clipboard.writeText(text).then(() => {
                showStatus('Copied to clipboard!', 'success');
                setTimeout(() => clearStatus(), 2000);
            }).catch(() => {
                outputText.select();
                document.execCommand('copy');
                showStatus('Copied to clipboard!', 'success');
                setTimeout(() => clearStatus(), 2000);
            });
        });
    }

    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            const text = outputText.value;
            if (!text) {
                showStatus('No text to download.', 'info');
                return;
            }
            const element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', 'alphabetized-list.txt');
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
            showStatus('Downloaded as alphabetized-list.txt', 'success');
            setTimeout(() => clearStatus(), 2000);
        });
    }

    if (clearInputBtn) {
        clearInputBtn.addEventListener('click', function() {
            if (inputText) inputText.value = '';
            if (outputText) outputText.value = '';
            if (charCount) charCount.textContent = '0 characters';
            clearStatus();
            if (inputText) inputText.focus();
        });
    }

    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            processText('asc');
        }
    });

    function showStatus(message, type) {
        statusMessage.textContent = message;
        statusMessage.className = 'status-message ' + type;
    }

    function clearStatus() {
        statusMessage.textContent = '';
        statusMessage.className = 'status-message';
    }
});

// ============================================
// REMOVE DUPLICATE LINES TOOL
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const removeDuplicatesBtn = document.getElementById('removeDuplicatesBtn');
    if (!removeDuplicatesBtn) return;

    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const charCount = document.querySelector('.char-count');
    const statusMessage = document.getElementById('statusMessage');
    const caseSensitiveCheckbox = document.getElementById('caseSensitiveCheckbox');
    const copyBtn = document.getElementById('copyBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const clearInputBtn = document.getElementById('clearInputBtn');

    if (inputText && charCount) {
        inputText.addEventListener('input', function() {
            const count = this.value.length;
            charCount.textContent = count + ' character' + (count !== 1 ? 's' : '');
        });
    }

    function removeDuplicates(text, caseSensitive) {
        const lines = text.split('\n');
        const seen = new Set();
        const result = [];
        let duplicatesCount = 0;
        
        for (const line of lines) {
            const key = caseSensitive ? line : line.toLowerCase();
            if (!seen.has(key)) {
                seen.add(key);
                result.push(line);
            } else {
                duplicatesCount++;
            }
        }
        
        return { result: result.join('\n'), count: duplicatesCount };
    }

    function processText() {
        const text = inputText.value;
        if (!text.trim()) {
            showStatus('Please enter some text first.', 'info');
            return;
        }

        const caseSensitive = caseSensitiveCheckbox ? caseSensitiveCheckbox.checked : false;
        const processed = removeDuplicates(text, caseSensitive);

        outputText.value = processed.result;
        showStatus('Removed ' + processed.count + ' duplicate line' + (processed.count !== 1 ? 's' : '') + '!', 'success');
    }

    if (removeDuplicatesBtn) removeDuplicatesBtn.addEventListener('click', processText);

    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            const text = outputText.value;
            if (!text) {
                showStatus('No text to copy. Remove duplicates first.', 'info');
                return;
            }
            navigator.clipboard.writeText(text).then(() => {
                showStatus('Copied to clipboard!', 'success');
                setTimeout(() => clearStatus(), 2000);
            }).catch(() => {
                outputText.select();
                document.execCommand('copy');
                showStatus('Copied to clipboard!', 'success');
                setTimeout(() => clearStatus(), 2000);
            });
        });
    }

    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            const text = outputText.value;
            if (!text) {
                showStatus('No text to download.', 'info');
                return;
            }
            const element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', 'no-duplicates.txt');
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
            showStatus('Downloaded as no-duplicates.txt', 'success');
            setTimeout(() => clearStatus(), 2000);
        });
    }

    if (clearInputBtn) {
        clearInputBtn.addEventListener('click', function() {
            if (inputText) inputText.value = '';
            if (outputText) outputText.value = '';
            if (charCount) charCount.textContent = '0 characters';
            clearStatus();
            if (inputText) inputText.focus();
        });
    }

    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            processText();
        }
    });

    function showStatus(message, type) {
        statusMessage.textContent = message;
        statusMessage.className = 'status-message ' + type;
    }

    function clearStatus() {
        statusMessage.textContent = '';
        statusMessage.className = 'status-message';
    }
});

// ============================================
// SORT LINES TOOL
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const sortBtn = document.getElementById('sortBtn');
    if (!sortBtn) return;

    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const charCount = document.querySelector('.char-count');
    const statusMessage = document.getElementById('statusMessage');
    const copyBtn = document.getElementById('copyBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const clearInputBtn = document.getElementById('clearInputBtn');

    if (inputText && charCount) {
        inputText.addEventListener('input', function() {
            const count = this.value.length;
            charCount.textContent = count + ' character' + (count !== 1 ? 's' : '');
        });
    }

    function sortLines(text, sortType) {
        const lines = text.split('\n').filter(line => line.trim().length > 0);
        
        switch (sortType) {
            case 'az':
                lines.sort((a, b) => a.localeCompare(b));
                break;
            case 'za':
                lines.sort((a, b) => b.localeCompare(a));
                break;
            case 'length-asc':
                lines.sort((a, b) => a.length - b.length);
                break;
            case 'length-desc':
                lines.sort((a, b) => b.length - a.length);
                break;
        }
        
        return lines.join('\n');
    }

    function processText() {
        const text = inputText.value;
        if (!text.trim()) {
            showStatus('Please enter some text first.', 'info');
            return;
        }

        const sortType = document.querySelector('input[name="sortType"]:checked').value;
        const result = sortLines(text, sortType);

        outputText.value = result;
        const linesCount = result.split('\n').filter(l => l.trim().length > 0).length;
        showStatus('Sorted! ' + linesCount + ' line' + (linesCount !== 1 ? 's' : '') + '.', 'success');
    }

    if (sortBtn) sortBtn.addEventListener('click', processText);

    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            const text = outputText.value;
            if (!text) {
                showStatus('No text to copy. Sort some text first.', 'info');
                return;
            }
            navigator.clipboard.writeText(text).then(() => {
                showStatus('Copied to clipboard!', 'success');
                setTimeout(() => clearStatus(), 2000);
            }).catch(() => {
                outputText.select();
                document.execCommand('copy');
                showStatus('Copied to clipboard!', 'success');
                setTimeout(() => clearStatus(), 2000);
            });
        });
    }

    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            const text = outputText.value;
            if (!text) {
                showStatus('No text to download.', 'info');
                return;
            }
            const element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', 'sorted-lines.txt');
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
            showStatus('Downloaded as sorted-lines.txt', 'success');
            setTimeout(() => clearStatus(), 2000);
        });
    }

    if (clearInputBtn) {
        clearInputBtn.addEventListener('click', function() {
            if (inputText) inputText.value = '';
            if (outputText) outputText.value = '';
            if (charCount) charCount.textContent = '0 characters';
            clearStatus();
            if (inputText) inputText.focus();
        });
    }

    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            processText();
        }
    });

    function showStatus(message, type) {
        statusMessage.textContent = message;
        statusMessage.className = 'status-message ' + type;
    }

    function clearStatus() {
        statusMessage.textContent = '';
        statusMessage.className = 'status-message';
    }
});

// ============================================
// REVERSE LIST TOOL
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const reverseBtn = document.getElementById('reverseBtn');
    if (!reverseBtn) return;

    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const charCount = document.querySelector('.char-count');
    const statusMessage = document.getElementById('statusMessage');
    const copyBtn = document.getElementById('copyBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const clearInputBtn = document.getElementById('clearInputBtn');

    if (inputText && charCount) {
        inputText.addEventListener('input', function() {
            const count = this.value.length;
            charCount.textContent = count + ' character' + (count !== 1 ? 's' : '');
        });
    }

    function reverseList(text) {
        const lines = text.split('\n');
        return lines.reverse().join('\n');
    }

    function processText() {
        const text = inputText.value;
        if (!text.trim()) {
            showStatus('Please enter some text first.', 'info');
            return;
        }

        const result = reverseList(text);
        outputText.value = result;
        showStatus('Reversed!', 'success');
    }

    if (reverseBtn) reverseBtn.addEventListener('click', processText);

    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            const text = outputText.value;
            if (!text) {
                showStatus('No text to copy. Reverse some text first.', 'info');
                return;
            }
            navigator.clipboard.writeText(text).then(() => {
                showStatus('Copied to clipboard!', 'success');
                setTimeout(() => clearStatus(), 2000);
            }).catch(() => {
                outputText.select();
                document.execCommand('copy');
                showStatus('Copied to clipboard!', 'success');
                setTimeout(() => clearStatus(), 2000);
            });
        });
    }

    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            const text = outputText.value;
            if (!text) {
                showStatus('No text to download.', 'info');
                return;
            }
            const element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', 'reversed-list.txt');
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
            showStatus('Downloaded as reversed-list.txt', 'success');
            setTimeout(() => clearStatus(), 2000);
        });
    }

    if (clearInputBtn) {
        clearInputBtn.addEventListener('click', function() {
            if (inputText) inputText.value = '';
            if (outputText) outputText.value = '';
            if (charCount) charCount.textContent = '0 characters';
            clearStatus();
            if (inputText) inputText.focus();
        });
    }

    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            processText();
        }
    });

    function showStatus(message, type) {
        statusMessage.textContent = message;
        statusMessage.className = 'status-message ' + type;
    }

    function clearStatus() {
        statusMessage.textContent = '';
        statusMessage.className = 'status-message';
    }
});

// ============================================
// RANDOMIZE LINES TOOL
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const randomizeBtn = document.getElementById('randomizeBtn');
    if (!randomizeBtn) return;

    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const charCount = document.querySelector('.char-count');
    const statusMessage = document.getElementById('statusMessage');
    const copyBtn = document.getElementById('copyBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const clearInputBtn = document.getElementById('clearInputBtn');

    if (inputText && charCount) {
        inputText.addEventListener('input', function() {
            const count = this.value.length;
            charCount.textContent = count + ' character' + (count !== 1 ? 's' : '');
        });
    }

    function randomizeLines(text) {
        const lines = text.split('\n');
        for (let i = lines.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [lines[i], lines[j]] = [lines[j], lines[i]];
        }
        return lines.join('\n');
    }

    function processText() {
        const text = inputText.value;
        if (!text.trim()) {
            showStatus('Please enter some text first.', 'info');
            return;
        }

        const result = randomizeLines(text);
        outputText.value = result;
        showStatus('Shuffled!', 'success');
    }

    if (randomizeBtn) randomizeBtn.addEventListener('click', processText);

    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            const text = outputText.value;
            if (!text) {
                showStatus('No text to copy. Shuffle some text first.', 'info');
                return;
            }
            navigator.clipboard.writeText(text).then(() => {
                showStatus('Copied to clipboard!', 'success');
                setTimeout(() => clearStatus(), 2000);
            }).catch(() => {
                outputText.select();
                document.execCommand('copy');
                showStatus('Copied to clipboard!', 'success');
                setTimeout(() => clearStatus(), 2000);
            });
        });
    }

    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            const text = outputText.value;
            if (!text) {
                showStatus('No text to download.', 'info');
                return;
            }
            const element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', 'randomized-list.txt');
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
            showStatus('Downloaded as randomized-list.txt', 'success');
            setTimeout(() => clearStatus(), 2000);
        });
    }

    if (clearInputBtn) {
        clearInputBtn.addEventListener('click', function() {
            if (inputText) inputText.value = '';
            if (outputText) outputText.value = '';
            if (charCount) charCount.textContent = '0 characters';
            clearStatus();
            if (inputText) inputText.focus();
        });
    }

    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            processText();
        }
    });

    function showStatus(message, type) {
        statusMessage.textContent = message;
        statusMessage.className = 'status-message ' + type;
    }

    function clearStatus() {
        statusMessage.textContent = '';
        statusMessage.className = 'status-message';
    }
});

// ============================================
// CLEAN EMPTY LINES TOOL
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const cleanBtn = document.getElementById('cleanBtn');
    if (!cleanBtn) return;

    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const charCount = document.querySelector('.char-count');
    const statusMessage = document.getElementById('statusMessage');
    const trimLinesCheckbox = document.getElementById('trimLinesCheckbox');
    const copyBtn = document.getElementById('copyBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const clearInputBtn = document.getElementById('clearInputBtn');

    if (inputText && charCount) {
        inputText.addEventListener('input', function() {
            const count = this.value.length;
            charCount.textContent = count + ' character' + (count !== 1 ? 's' : '');
        });
    }

    function cleanEmptyLines(text, trimLines) {
        const lines = text.split('\n');
        const originalCount = lines.length;
        const cleaned = [];
        
        for (let line of lines) {
            if (trimLines) {
                line = line.trim();
            }
            if (line.length > 0) {
                cleaned.push(trimLines ? line : line);
            }
        }
        
        const removedCount = originalCount - cleaned.length;
        return { result: cleaned.join('\n'), removed: removedCount };
    }

    function processText() {
        const text = inputText.value;
        if (!text.trim()) {
            showStatus('Please enter some text first.', 'info');
            return;
        }

        const trimLines = trimLinesCheckbox ? trimLinesCheckbox.checked : false;
        const processed = cleanEmptyLines(text, trimLines);

        outputText.value = processed.result;
        showStatus('Removed ' + processed.removed + ' empty line' + (processed.removed !== 1 ? 's' : '') + '!', 'success');
    }

    if (cleanBtn) cleanBtn.addEventListener('click', processText);

    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            const text = outputText.value;
            if (!text) {
                showStatus('No text to copy. Clean some text first.', 'info');
                return;
            }
            navigator.clipboard.writeText(text).then(() => {
                showStatus('Copied to clipboard!', 'success');
                setTimeout(() => clearStatus(), 2000);
            }).catch(() => {
                outputText.select();
                document.execCommand('copy');
                showStatus('Copied to clipboard!', 'success');
                setTimeout(() => clearStatus(), 2000);
            });
        });
    }

    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            const text = outputText.value;
            if (!text) {
                showStatus('No text to download.', 'info');
                return;
            }
            const element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', 'cleaned-list.txt');
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
            showStatus('Downloaded as cleaned-list.txt', 'success');
            setTimeout(() => clearStatus(), 2000);
        });
    }

    if (clearInputBtn) {
        clearInputBtn.addEventListener('click', function() {
            if (inputText) inputText.value = '';
            if (outputText) outputText.value = '';
            if (charCount) charCount.textContent = '0 characters';
            clearStatus();
            if (inputText) inputText.focus();
        });
    }

    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            processText();
        }
    });

    function showStatus(message, type) {
        statusMessage.textContent = message;
        statusMessage.className = 'status-message ' + type;
    }

    function clearStatus() {
        statusMessage.textContent = '';
        statusMessage.className = 'status-message';
    }
});

// ============================================
// FILTER LINES BY KEYWORD TOOL
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const filterBtn = document.getElementById('filterBtn');
    if (!filterBtn) return;

    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const charCount = document.querySelector('.char-count');
    const statusMessage = document.getElementById('statusMessage');
    const keywordInput = document.getElementById('keywordInput');
    const caseSensitiveCheckbox = document.getElementById('caseSensitiveCheckbox');
    const copyBtn = document.getElementById('copyBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const clearInputBtn = document.getElementById('clearInputBtn');

    if (inputText && charCount) {
        inputText.addEventListener('input', function() {
            const count = this.value.length;
            charCount.textContent = count + ' character' + (count !== 1 ? 's' : '');
        });
    }

    function filterLines(text, keyword, action, caseSensitive) {
        if (!keyword.trim()) {
            return { result: '', count: 0 };
        }
        
        const lines = text.split('\n');
        const filtered = [];
        let matchCount = 0;
        
        for (const line of lines) {
            const searchText = caseSensitive ? line : line.toLowerCase();
            const searchKeyword = caseSensitive ? keyword : keyword.toLowerCase();
            const matches = searchText.includes(searchKeyword);
            
            if (action === 'show' && matches) {
                filtered.push(line);
                matchCount++;
            } else if (action === 'hide' && !matches) {
                filtered.push(line);
            } else if (action === 'hide' && matches) {
                matchCount++;
            }
        }
        
        return { result: filtered.join('\n'), count: matchCount };
    }

    function processText() {
        const text = inputText.value;
        const keyword = keywordInput.value;

        if (!text.trim()) {
            showStatus('Please enter some text first.', 'info');
            return;
        }

        if (!keyword.trim()) {
            showStatus('Please enter a keyword to search for.', 'info');
            return;
        }

        const action = document.querySelector('input[name="filterAction"]:checked').value;
        const caseSensitive = caseSensitiveCheckbox ? caseSensitiveCheckbox.checked : false;
        const processed = filterLines(text, keyword, action, caseSensitive);

        outputText.value = processed.result;
        const actionText = action === 'show' ? 'Found' : 'Hidden';
        showStatus(actionText + ' ' + processed.count + ' matching line' + (processed.count !== 1 ? 's' : '') + '!', 'success');
    }

    if (filterBtn) filterBtn.addEventListener('click', processText);

    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            const text = outputText.value;
            if (!text) {
                showStatus('No text to copy. Filter some text first.', 'info');
                return;
            }
            navigator.clipboard.writeText(text).then(() => {
                showStatus('Copied to clipboard!', 'success');
                setTimeout(() => clearStatus(), 2000);
            }).catch(() => {
                outputText.select();
                document.execCommand('copy');
                showStatus('Copied to clipboard!', 'success');
                setTimeout(() => clearStatus(), 2000);
            });
        });
    }

    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            const text = outputText.value;
            if (!text) {
                showStatus('No text to download.', 'info');
                return;
            }
            const element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', 'filtered-list.txt');
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
            showStatus('Downloaded as filtered-list.txt', 'success');
            setTimeout(() => clearStatus(), 2000);
        });
    }

    if (clearInputBtn) {
        clearInputBtn.addEventListener('click', function() {
            if (inputText) inputText.value = '';
            if (outputText) outputText.value = '';
            if (keywordInput) keywordInput.value = '';
            if (charCount) charCount.textContent = '0 characters';
            clearStatus();
            if (inputText) inputText.focus();
        });
    }

    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            processText();
        }
    });

    function showStatus(message, type) {
        statusMessage.textContent = message;
        statusMessage.className = 'status-message ' + type;
    }

    function clearStatus() {
        statusMessage.textContent = '';
        statusMessage.className = 'status-message';
    }
});

// ============================================
// EXTRACT EMAILS TOOL
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const extractBtn = document.getElementById('extractBtn');
    if (!extractBtn) return;
    
    const isExtractEmailsPage = window.location.pathname.includes('extract-emails') || 
                                 (document.querySelector('h1') && document.querySelector('h1').textContent.includes('Extract Emails'));
    if (!isExtractEmailsPage) return;

    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const charCount = document.querySelector('.char-count');
    const statusMessage = document.getElementById('statusMessage');
    const removeDuplicatesCheckbox = document.getElementById('removeDuplicatesCheckbox');
    const copyBtn = document.getElementById('copyBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const clearInputBtn = document.getElementById('clearInputBtn');

    if (inputText && charCount) {
        inputText.addEventListener('input', function() {
            const count = this.value.length;
            charCount.textContent = count + ' character' + (count !== 1 ? 's' : '');
        });
    }

    function extractEmails(text, removeDuplicates) {
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
        const emails = text.match(emailRegex) || [];
        
        if (removeDuplicates) {
            const uniqueEmails = [...new Set(emails)];
            return { emails: uniqueEmails, count: uniqueEmails.length };
        }
        
        return { emails: emails, count: emails.length };
    }

    function processText() {
        const text = inputText.value;
        if (!text.trim()) {
            showStatus('Please enter some text first.', 'info');
            return;
        }

        const removeDuplicates = removeDuplicatesCheckbox ? removeDuplicatesCheckbox.checked : false;
        const extracted = extractEmails(text, removeDuplicates);

        outputText.value = extracted.emails.join('\n');
        showStatus('Found ' + extracted.count + ' email' + (extracted.count !== 1 ? 's' : '') + '!', 'success');
    }

    if (extractBtn) extractBtn.addEventListener('click', processText);

    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            const text = outputText.value;
            if (!text) {
                showStatus('No text to copy. Extract emails first.', 'info');
                return;
            }
            navigator.clipboard.writeText(text).then(() => {
                showStatus('Copied to clipboard!', 'success');
                setTimeout(() => clearStatus(), 2000);
            }).catch(() => {
                outputText.select();
                document.execCommand('copy');
                showStatus('Copied to clipboard!', 'success');
                setTimeout(() => clearStatus(), 2000);
            });
        });
    }

    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            const text = outputText.value;
            if (!text) {
                showStatus('No text to download.', 'info');
                return;
            }
            const element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', 'extracted-emails.txt');
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
            showStatus('Downloaded as extracted-emails.txt', 'success');
            setTimeout(() => clearStatus(), 2000);
        });
    }

    if (clearInputBtn) {
        clearInputBtn.addEventListener('click', function() {
            if (inputText) inputText.value = '';
            if (outputText) outputText.value = '';
            if (charCount) charCount.textContent = '0 characters';
            clearStatus();
            if (inputText) inputText.focus();
        });
    }

    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            processText();
        }
    });

    function showStatus(message, type) {
        statusMessage.textContent = message;
        statusMessage.className = 'status-message ' + type;
    }

    function clearStatus() {
        statusMessage.textContent = '';
        statusMessage.className = 'status-message';
    }
});

// ============================================
// EXTRACT URLs TOOL
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const extractBtn = document.getElementById('extractBtn');
    if (!extractBtn) return;
    
    const isExtractUrlsPage = window.location.pathname.includes('extract-urls') || 
                               (document.querySelector('h1') && document.querySelector('h1').textContent.includes('Extract URLs'));
    if (!isExtractUrlsPage) return;

    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const charCount = document.querySelector('.char-count');
    const statusMessage = document.getElementById('statusMessage');
    const removeDuplicatesCheckbox = document.getElementById('removeDuplicatesCheckbox');
    const copyBtn = document.getElementById('copyBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const clearInputBtn = document.getElementById('clearInputBtn');

    if (inputText && charCount) {
        inputText.addEventListener('input', function() {
            const count = this.value.length;
            charCount.textContent = count + ' character' + (count !== 1 ? 's' : '');
        });
    }

    function extractUrls(text, removeDuplicates) {
        const urlRegex = /(https?:\/\/[^\s<>]+|ftp:\/\/[^\s<>]+|www\.[^\s<>]+)/gi;
        const urls = text.match(urlRegex) || [];
        
        if (removeDuplicates) {
            const uniqueUrls = [...new Set(urls)];
            return { urls: uniqueUrls, count: uniqueUrls.length };
        }
        
        return { urls: urls, count: urls.length };
    }

    function processText() {
        const text = inputText.value;
        if (!text.trim()) {
            showStatus('Please enter some text first.', 'info');
            return;
        }

        const removeDuplicates = removeDuplicatesCheckbox ? removeDuplicatesCheckbox.checked : false;
        const extracted = extractUrls(text, removeDuplicates);

        outputText.value = extracted.urls.join('\n');
        showStatus('Found ' + extracted.count + ' URL' + (extracted.count !== 1 ? 's' : '') + '!', 'success');
    }

    if (extractBtn) extractBtn.addEventListener('click', processText);

    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            const text = outputText.value;
            if (!text) {
                showStatus('No text to copy. Extract URLs first.', 'info');
                return;
            }
            navigator.clipboard.writeText(text).then(() => {
                showStatus('Copied to clipboard!', 'success');
                setTimeout(() => clearStatus(), 2000);
            }).catch(() => {
                outputText.select();
                document.execCommand('copy');
                showStatus('Copied to clipboard!', 'success');
                setTimeout(() => clearStatus(), 2000);
            });
        });
    }

    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            const text = outputText.value;
            if (!text) {
                showStatus('No text to download.', 'info');
                return;
            }
            const element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', 'extracted-urls.txt');
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
            showStatus('Downloaded as extracted-urls.txt', 'success');
            setTimeout(() => clearStatus(), 2000);
        });
    }

    if (clearInputBtn) {
        clearInputBtn.addEventListener('click', function() {
            if (inputText) inputText.value = '';
            if (outputText) outputText.value = '';
            if (charCount) charCount.textContent = '0 characters';
            clearStatus();
            if (inputText) inputText.focus();
        });
    }

    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            processText();
        }
    });

    function showStatus(message, type) {
        statusMessage.textContent = message;
        statusMessage.className = 'status-message ' + type;
    }

    function clearStatus() {
        statusMessage.textContent = '';
        statusMessage.className = 'status-message';
    }
});

// ============================================
// MERGE/SPLIT LINES TOOL
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const mergeBtn = document.getElementById('mergeBtn');
    if (!mergeBtn) return;

    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const charCount = document.querySelector('.char-count');
    const statusMessage = document.getElementById('statusMessage');
    const splitBtn = document.getElementById('splitBtn');
    const mergeSeparator = document.getElementById('mergeSeparator');
    const splitSeparator = document.getElementById('splitSeparator');
    const mergeCustomSeparator = document.getElementById('mergeCustomSeparator');
    const splitCustomSeparator = document.getElementById('splitCustomSeparator');
    const copyBtn = document.getElementById('copyBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const clearInputBtn = document.getElementById('clearInputBtn');

    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tab = this.dataset.tab;
                tabButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                tabContents.forEach(content => content.classList.remove('active'));
                document.getElementById(tab + 'Tab').classList.add('active');
            });
        });
    }

    if (mergeSeparator) {
        mergeSeparator.addEventListener('change', function() {
            if (mergeCustomSeparator) {
                mergeCustomSeparator.classList.toggle('show', this.value === 'custom');
            }
        });
    }
    
    if (splitSeparator) {
        splitSeparator.addEventListener('change', function() {
            if (splitCustomSeparator) {
                splitCustomSeparator.classList.toggle('show', this.value === 'custom');
            }
        });
    }

    if (inputText && charCount) {
        inputText.addEventListener('input', function() {
            const count = this.value.length;
            charCount.textContent = count + ' character' + (count !== 1 ? 's' : '');
        });
    }

    function getSeparator(selectElement, customInput) {
        const value = selectElement.value;
        if (value === 'custom') {
            return customInput.value;
        }
        
        switch (value) {
            case 'space': return ' ';
            case 'comma': return ', ';
            case 'semicolon': return '; ';
            case 'pipe': return '|';
            default: return ' ';
        }
    }

    function mergeLines(text, separator) {
        const lines = text.split('\n').filter(line => line.trim().length > 0);
        const beforeCount = lines.length;
        const result = lines.join(separator);
        return { result: result, before: beforeCount, after: 1 };
    }

    function splitText(text, separator) {
        const beforeCount = text.length;
        const lines = text.split(separator).filter(line => line.trim().length > 0);
        const result = lines.join('\n');
        return { result: result, before: 1, after: lines.length };
    }

    function processMerge() {
        const text = inputText.value;
        if (!text.trim()) {
            showStatus('Please enter some text first.', 'info');
            return;
        }

        const separator = getSeparator(mergeSeparator, mergeCustomSeparator);
        const processed = mergeLines(text, separator);

        outputText.value = processed.result;
        showStatus('Merged! ' + processed.before + ' line' + (processed.before !== 1 ? 's' : '') + ' -> 1 line.', 'success');
    }

    function processSplit() {
        const text = inputText.value;
        if (!text.trim()) {
            showStatus('Please enter some text first.', 'info');
            return;
        }

        const separator = getSeparator(splitSeparator, splitCustomSeparator);
        if (!separator) {
            showStatus('Please enter a custom separator.', 'info');
            return;
        }

        const processed = splitText(text, separator);
        outputText.value = processed.result;
        showStatus('Split! 1 line -> ' + processed.after + ' line' + (processed.after !== 1 ? 's' : '') + '.', 'success');
    }

    if (mergeBtn) mergeBtn.addEventListener('click', processMerge);
    if (splitBtn) splitBtn.addEventListener('click', processSplit);

    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            const text = outputText.value;
            if (!text) {
                showStatus('No text to copy. Process some text first.', 'info');
                return;
            }
            navigator.clipboard.writeText(text).then(() => {
                showStatus('Copied to clipboard!', 'success');
                setTimeout(() => clearStatus(), 2000);
            }).catch(() => {
                outputText.select();
                document.execCommand('copy');
                showStatus('Copied to clipboard!', 'success');
                setTimeout(() => clearStatus(), 2000);
            });
        });
    }

    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            const text = outputText.value;
            if (!text) {
                showStatus('No text to download.', 'info');
                return;
            }
            const element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', 'processed-list.txt');
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
            showStatus('Downloaded as processed-list.txt', 'success');
            setTimeout(() => clearStatus(), 2000);
        });
    }

    if (clearInputBtn) {
        clearInputBtn.addEventListener('click', function() {
            if (inputText) inputText.value = '';
            if (outputText) outputText.value = '';
            if (charCount) charCount.textContent = '0 characters';
            clearStatus();
            if (inputText) inputText.focus();
        });
    }

    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            const activeTab = document.querySelector('.tab-content.active');
            if (activeTab.id === 'mergeTab') {
                processMerge();
            } else {
                processSplit();
            }
        }
    });

    function showStatus(message, type) {
        statusMessage.textContent = message;
        statusMessage.className = 'status-message ' + type;
    }

    function clearStatus() {
        statusMessage.textContent = '';
        statusMessage.className = 'status-message';
    }
});