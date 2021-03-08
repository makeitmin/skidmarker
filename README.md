# :motorcycle: Skidmarker

레이서를 위한 포트폴리오 웹 서비스입니다. 레이서의 포트폴리오를 기록하고, 다른 레이서의 포트폴리오도 확인할 수 있습니다.  

Microsoft Azure VM을 기반으로 Flask(Back-End)와 React(Front-End)로 동작하며, MySQL DB를 사용합니다. 개발사항은 수시로 갱신됩니다.  

멋진 자취를 남겨보세요! :point_right: [Skidmarker Demo](http://elice-kdt-ai-track-vm-racer-48.koreacentral.cloudapp.azure.com/) :point_left:


## Getting Started

기본적으로 로컬에서 Microsoft Visual Studio Code를 통해 작성되었으며, Python-Flask와 React 환경이 필요합니다.  
- [React 공식 문서](https://ko.reactjs.org/docs/getting-started.html)  
- [Flask 공식 문서](https://flask-docs-kr.readthedocs.io/ko/latest/)

### Prerequisites

로컬에 아래 사항들이 준비가 되어있어야합니다. 

```
Python 3.9.1
NodeJS 12.21.0
MySQL Client Server 8.0
MySQL Workbench 8.0 (Optional)
```
Windows 10 Powershell에서 관리자 권한으로 chocolatey 커맨드를 통해 설치를 진행했습니다.
```
choco install mysql mysql.workbench python --y
choco install node
```

### Installing

Flask 구현에 필요한 Python Packages 입니다. 사용하시는 가상환경을 활성화한 뒤 실행해주세요.

```
pip install -r requirements.txt
```

React 구현에 필요한 node_modules 입니다. react-app 디렉토리에서 실행해주세요.

```
npm install --save
```

## Running

1. 로컬의 VS Code의 터미널을 2개 생성합니다.
2. requiremets.txt 의 패키지가 모두 설치된 python 가상환경을 만들고 실행합니다.
3. flask 디렉토리에서 python app.py로 Back-End를 실행합니다.
4. react-app 디렉토리에서 npm start로 Front-End를 실행합니다.
5. Front-End와 Back-End는 기본적으로 localhost:3000 과 localhost:5000 에서 실행됩니다.

## Deployment

Microsoft Azure VM의 Ubuntu18.04 환경입니다.  

Client(React)는 Nginx, Server(Flask)는 gunicorn 을 사용하여 배포하였습니다.