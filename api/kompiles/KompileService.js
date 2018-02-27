'use strict';

var _ = require('underscore')
var kompileRepository = require('./KompileRepository');
var kompileMapper = require('./KompileMapper');

function createError(status, message) {
	return {
		status: status,
		message: message
	}
}

function emailOrProjectIsRequired() {
  return new Promise((resolve, reject) => {
      reject(createError(400, 'user or project is required'))
  });
}

function emailOrProjectIsRequiredNotBoth() {
  return new Promise((resolve, reject) => {
      reject(createError(400, 'user or project is required but not both'))
  });
}

function retrieveKompilesByEmailAndProject(email, project) {
  if (!email && !project) return emailOrProjectIsRequired()
  else if (!email) return retrieveKompilesByProject(project)
  else if (!project) return retrieveKompilesByEmail(email)
  else return new Promise((resolve, reject) => {
      kompileRepository.findKompilesByEmailAndProject(email, project)
      .then(kompiles => {
        if (!kompiles) reject(createError(404, 'Kompiles not found filtering by ' + email + ' email and project ' + project))
        else resolve(kompileMapper.mapKompiles(kompiles));
      }).catch(err => reject(err));
  });
}

function retrieveKompilesByEmail(email) {
  return new Promise((resolve, reject) => {
      kompileRepository.findKompilesByEmail(email)
        .then(kompiles => {
          if (!kompiles) reject(createError(404, 'Kompiles not found filtering by ' + email + ' email'))
          else resolve(kompileMapper.mapKompiles(kompiles));
        })
        .catch(err => reject(err));
    });
}

function retrieveKompilesByProject(project) {
  return new Promise((resolve, reject) => {
      kompileRepository.findKompilesByProject(project)
        .then(kompiles => {
        	if (!kompiles) reject(createError(404, 'Kompiles not found filtering by ' + project + ' project'))
        	else resolve(kompileMapper.mapKompiles(kompiles));
        })
        .catch(err => reject(err));
    });
}

function saveKompile(kompile) {
	return new Promise((resolve, reject) => {
      if (!kompile.duration || kompile.duration == 0) reject(createError(400, 'duration is required'))
      else if(!kompile.user) reject(createError(400, 'user is required'))
      else if(!kompile.project) reject(createError(400, 'project is required'))
    	else kompileRepository.saveKompile(kompile)
      		.then(kompile => resolve(kompileMapper.mapKompile(kompile)))
      		.catch(err => reject(err));
  	});
}

function averageSummaryByEmail(email) {
  return new Promise((resolve, reject) => {
      kompileRepository.averageSummaryByEmail(email).then(kompile => {
      	if (!kompile) reject(createError(400, 'Kompiles not found for ' + email))
        resolve(kompileMapper.mapKompileAverage(kompile))
      }).catch(err => reject(err));
  });
}

function averageSummaryByProject(project) {
  return new Promise((resolve, reject) => {
      kompileRepository.averageSummaryByProject(project).then(kompile => {
      	if (!kompile) reject(createError(400, 'Kompiles not found for ' + project))
        resolve(kompileMapper.mapKompileAverage(kompile))
      }).catch(err => reject(err));
  });
}

function averageSummaryByEmailAndProject(email, project) {
  if (!email && !project) return emailOrProjectIsRequired()
  else if(!email) return averageSummaryByProject(project)
  else if (!project) return averageSummaryByEmail(email)
  else return new Promise((resolve, reject) => {
      kompileRepository.averageSummaryByEmailAndProject(email, project).then(kompile => {
      	if (!kompile) reject(createError(400, 'Kompiles not found for ' + email + ' email and ' + project + ' project'))
        resolve(kompileMapper.mapKompileAverage(kompile))
      }).catch(err => reject(err));
  });
}

function averageByEmail(email) {
  return new Promise((resolve, reject) => {
      kompileRepository.averageByEmail(email)
      .then(kompiles => {
        if (!kompiles || kompiles.length == 0) reject(createError(400, 'Kompiles not found for ' + email + ' email'))
        else resolve(kompileMapper.mapKompilesAverage(kompiles))
      }).catch(err => reject(err));
  });
}

function averageByProject(project) {
  return new Promise((resolve, reject) => {
      kompileRepository.averageByProject(project)
      .then(kompiles => {
        if (!kompiles || kompiles.length == 0) reject(createError(400, 'Kompiles not found for ' + project + ' project'))
        else resolve(kompileMapper.mapKompilesAverage(kompiles))
      }).catch(err => reject(err));
  });
}

function sumByEmail(email) {
  return new Promise((resolve, reject) => {
      kompileRepository.sumByEmail(email)
      .then(kompiles => {
        if (!kompiles || kompiles.length == 0) reject(createError(400, 'Kompiles not found for ' + email + ' email'))
        else resolve(kompileMapper.mapKompilesSum(kompiles))
      }).catch(err => reject(err));
  });
}

function sumByProject(project) {
  return new Promise((resolve, reject) => {
      kompileRepository.sumByProject(project)
      .then(kompiles => {
        if (!kompiles || kompiles.length == 0) reject(createError(400, 'Kompiles not found for ' + project + ' project'))
        else resolve(kompileMapper.mapKompilesSum(kompiles))
      }).catch(err => reject(err));
  });
}

function averageByEmailOrProject(email, project) {
  if (email && project) return emailOrProjectIsRequiredNotBoth()
  else if(!email && project) return averageByProject(project)
  else if (!project && email) return averageByEmail(email)
  else return new Promise((resolve, reject) => {
    kompileRepository.average().then(kompiles => {
      if (!kompiles || kompiles.length == 0) reject(createError(400, 'Kompiles not found'))
      else resolve(kompileMapper.mapKompilesAverage(kompiles))
    }).catch(err => reject(err));
  })
}

function sumByEmailOrProject(email, project) {
  if (email && project) return emailOrProjectIsRequiredNotBoth()
  else if(!email && project) return sumByProject(project)
  else if (!project && email) return sumByEmail(email)
  else return new Promise((resolve, reject) => {
      kompileRepository.sum().then(kompiles => {
        if (!kompiles || kompiles.length == 0) reject(createError(400, 'Kompiles not found'))
        else resolve(kompileMapper.mapKompilesSum(kompiles))
      }).catch(err => reject(err));
  });
}

function sumSummaryByEmail(email) {
  return new Promise((resolve, reject) => {
      kompileRepository.sumSummaryByEmail(email).then(kompile => {
        if (!kompile) reject(createError(400, 'Kompiles not found for ' + email))
        resolve(kompileMapper.mapKompileSum(kompile))
      }).catch(err => reject(err));
  });
}

function sumSummaryByProject(project) {
  return new Promise((resolve, reject) => {
      kompileRepository.sumSummaryByProject(project).then(kompile => {
        if (!kompile) reject(createError(400, 'Kompiles not found for ' + project))
        resolve(kompileMapper.mapKompileSum(kompile))
      }).catch(err => reject(err));
  });
}

function sumSummaryByEmailAndProject(email, project) {
  if (!email && !project) return emailOrProjectIsRequired()
  else if(!email) return sumSummaryByProject(project)
  else if (!project) return sumSummaryByEmail(email)
  else return new Promise((resolve, reject) => {
      kompileRepository.sumSummaryByEmailAndProject(email, project).then(kompile => {
        if (!kompile) reject(createError(400, 'Kompiles not found for ' + email + ' email and ' + project + ' project'))
        resolve(kompileMapper.mapKompileSum(kompile))
      }).catch(err => reject(err));
  });
}

module.exports = {
  	retrieveKompilesByEmail: retrieveKompilesByEmail,
  	retrieveKompilesByProject: retrieveKompilesByProject,
  	retrieveKompilesByEmailAndProject : retrieveKompilesByEmailAndProject,
  	averageSummaryByEmailAndProject : averageSummaryByEmailAndProject,
    sumSummaryByEmailAndProject : sumSummaryByEmailAndProject,
    averageByEmailOrProject: averageByEmailOrProject,
    sumByEmailOrProject: sumByEmailOrProject,
	  saveKompile: saveKompile
}