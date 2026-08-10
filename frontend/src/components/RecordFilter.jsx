const tagOptions = ["dp","graph","binary-search","math","greedy"];

const statusOptions = [
    {value: "solved", label: "解けた"},
    {value: "review", label: "要復習"},
    {value: "unsolved", label: "解けなかった"},
]

const difficultyOptions = [
    {value: "400", label: "400以上"},
    {value: "800", label: "800以上"},
    {value: "1200", label: "1200以上"},
];

export default function RecordFilter({
    searchText,
    onSearchTextChange,
    statusFilter,
    onStatusFilterChange,
    tagFilter,
    onTagFilterChange,
    difficultyFilter,
    onDifficultyFilterChange,
    onResetFilters,
}) {
    return (
	<section>
	    <h2>検索・フィルタ</h2>

	    <div>
		<label htmlFor="search-text">キーワード検索</label>
		<input
		    type="text"
		    id="search-text"
		    value={searchText}
		    onChange={(e) => onSearchTextChange(e.target.value)}
		    placeholder="問題名・メモ・URLで検索"
		/>
	    </div>
	    <div>
		<label htmlFor="status-filter">ステータス</label>
		<select
		    id="status-filter"
		    value={statusFilter}
		    onChange={(e) => onStatusFilterChange(e.target.value)}>
		    <option value="">すべて</option>
		    {statusOptions.map((status) => (
			<option key={status.value} value={status.value}>
			    {status.label}
			</option>
		    ))}

		</select>
	    </div>
	    <div>
		<label htmlFor="tag-filter">タグ</label>
		<select
		    id="tag-filter"
		    value={tagFilter}
		    onChange={(e) => onTagFilterChange(e.target.value)}
		>
		    <option value="">すべて</option>
		    {tagOptions.map((tag) => (
			<option key={tag} value={tag}>
			    {tag}
			</option>
		    ))}
		</select>
	    </div>
	    <div>
		<label htmlFor="difficulty-filter">difficulty</label>
		<select
		    id="difficulty-filter"
		    value={difficultyFilter}
		    onChange={(e) => onDifficultyFilterChange(e.target.value)}>
		    <option value="">すべて</option>
		    {difficultyOptions.map((difficulty) => (
			<option key={difficulty.value} value={difficulty.value}>
			    {difficulty.label}
			</option>
		    ))}
		</select>
	    </div>
	    <button type="button" onClick={onResetFilters}>
		条件をリセット
	    </button>
	</section>
    );
}
