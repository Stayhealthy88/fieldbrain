# FIELDBRAIN — 야전두뇌

> **연결이 끊겨도, 지휘소는 기억하고 답한다.**
> 지휘소(CP) 단위 오프라인 전장 지식 시스템 — 소형 로컬 LLM + 3층 볼트(raw/wiki) + ingest·query·lint

D4D 2026 해커톤 (7/4–5, T5-C 거부환경 온디바이스 전술 어시스턴트) 출전 프로젝트.

## 피칭 사이트

이 레포의 메인은 팀 브리핑용 피칭 웹사이트다.

- **온라인:** https://stayhealthy88.github.io/fieldbrain/ (GitHub Pages)
- **오프라인:** `index.html`을 브라우저로 열면 끝 — 외부 리소스 0개, 비행기모드에서도 동작 (제품과 같은 원칙)
- 조작: `←` `→` 또는 `Space` 로 슬라이드 이동

## 핵심 개념

```
fieldbrain-vault/
├── raw/                  # 불변 · LLM 읽기전용 (write-once)
│   ├── logs/             # 전장 이벤트 자동 직렬화
│   ├── doctrine/         # 교리·교범·SOP
│   └── comms/            # 수신 보고(SALUTE) 원문
├── wiki/                 # 로컬 LLM이 생성·유지보수
│   ├── situation.md      # 상황판 (METT-TC)
│   ├── units/            # 아군/적 부대 엔티티
│   └── lessons/          # 전훈
├── index.canvas          # 전황 지도
└── SCHEMA.md             # 보고 양식·갱신·lint 규칙
```

세 오퍼레이션 = 지휘소 참모 기능의 자동화:

- **ingest — 상황병** · 보고 접수→상황판 전기(轉記) 자동화: 파일 감시 + 임베딩 + 증분 색인 (저장→질의 가능 ~4초, 위키 갱신·크로스링크)
- **query — 작전참모** · 근거 조항을 달아 보고: 의미 검색 + RBAC 프리필터 + [교범 조항 ID]+[보고 타임스탬프] 인용 강제·검증, 근거 없으면 거부
- **lint — 정보장교** · 첩보 교차검증: 엔티티 추출(부대·위치·시각) + 모순·스테일 탐지 → ⚠ 재확인 요구 = 정보융합(intel fusion) 자동화

스택: Ollama + 한국어 sLLM(Mi:dm 2.0 / A.X 4.0 Light) + KURE-v1 임베딩 + LanceDB · MacBook Air M2 16GB 단독 구동.

## 문서

- [docs/prior-art.md](docs/prior-art.md) — 선행 사례 분석 (로컬 볼트 RAG 생태계 · 국방 AI 랜드스케이프 · 실시간 인덱싱 패턴 · 오프라인 지도 스트레치 골)

## 컴플라이언스

공개 교범 + 합성(synthetic) 로그·보고만 사용. 군사기밀·대외비 일절 배제.
