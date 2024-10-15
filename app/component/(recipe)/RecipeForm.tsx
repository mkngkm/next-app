import { useState } from 'react';

interface RecipeFormProps {
  initialTitle: string;
  initialIngredients: string[];
  initialInstructions: string[];
  onSubmit: (
    title: string,
    ingredients: string[],
    instructions: string[],
    tags: string[] // 태그를 추가 파라미터로 받아옴
  ) => void;
  showTags?: boolean; // 태그 입력 필드 표시 여부
}

const RecipeForm: React.FC<RecipeFormProps> = ({
  initialTitle,
  initialIngredients,
  initialInstructions,
  onSubmit,
  showTags = true,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [ingredients, setIngredients] = useState(initialIngredients);
  const [instructions, setInstructions] = useState(initialInstructions);
  const [newIngredient, setNewIngredient] = useState('');
  const [newInstruction, setNewInstruction] = useState('');
  const [newTag, setNewTag] = useState(''); // 새로운 태그 상태 추가
  const [tags, setTags] = useState<string[]>([]); // 태그 배열 상태 추가

  const handleAddIngredient = () => {
    if (newIngredient.trim()) {
      setIngredients((prev) => [...prev, newIngredient]);
      setNewIngredient(''); // 입력 필드 초기화
    }
  };

  const handleAddInstruction = () => {
    if (newInstruction.trim()) {
      setInstructions((prev) => [...prev, newInstruction]);
      setNewInstruction(''); // 입력 필드 초기화
    }
  };

  const handleAddTag = () => {
    if (newTag.trim()) {
      setTags((prev) => [...prev, newTag]);
      setNewTag(''); // 입력 필드 초기화
    }
  };

  const handleSubmit = () => {
    onSubmit(title, ingredients, instructions, tags); // 태그도 함께 제출
  };

  return (
    <div>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='레시피 제목'
      />

      <div>
        <h3>재료 목록</h3>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>
              {ingredient}
              <button
                onClick={() =>
                  setIngredients((prev) => prev.filter((_, i) => i !== index))
                }
              >
                삭제
              </button>
            </li>
          ))}
        </ul>

        <input
          value={newIngredient}
          onChange={(e) => setNewIngredient(e.target.value)}
          placeholder='재료 입력'
        />
        <button onClick={handleAddIngredient}>재료 추가</button>
      </div>

      <div>
        <h3>조리 과정</h3>
        <ul>
          {instructions.map((instruction, index) => (
            <li key={index}>
              {instruction}
              <button
                onClick={() =>
                  setInstructions((prev) => prev.filter((_, i) => i !== index))
                }
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
        <input
          value={newInstruction}
          onChange={(e) => setNewInstruction(e.target.value)}
          placeholder='조리 과정 입력'
        />
        <button onClick={handleAddInstruction}>조리 방법 추가</button>
      </div>

      {showTags && ( // 태그 입력 필드 표시
        <div>
          <h3>태그 목록</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {tags.map((tag, index) => (
              <span
                key={index}
                style={{
                  backgroundColor: '#e0e0e0',
                  padding: '4px 8px',
                  borderRadius: '4px',
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
          <input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder='태그 입력'
          />
          <button onClick={handleAddTag}>태그 추가</button>
        </div>
      )}

      <button onClick={handleSubmit}>저장하기</button>
    </div>
  );
};

export default RecipeForm;
